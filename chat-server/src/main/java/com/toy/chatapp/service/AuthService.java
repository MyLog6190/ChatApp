package com.toy.chatapp.service;

import java.util.HashMap;
import java.util.UUID;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.toy.chatapp.common.exception.ChatException;
import com.toy.chatapp.common.exception.ErrorCode;
import com.toy.chatapp.dto.SignInRequestDto;
import com.toy.chatapp.dto.SignInResponseDto;
import com.toy.chatapp.dto.SignUpRequestDto;
import com.toy.chatapp.dto.VerityCodeResponseDto;
import com.toy.chatapp.entity.User;
import com.toy.chatapp.enums.EmailType;
import com.toy.chatapp.enums.UserRole;
import com.toy.chatapp.factory.MailServiceFactory;
import com.toy.chatapp.security.jwt.JwtTokenProvider;
import com.toy.chatapp.service.redis.EmailVerificationCodeRedisService;
import com.toy.chatapp.service.redis.EmailVerifiedStatusRedisService;
import com.toy.chatapp.service.redis.RefleshTokenRedisService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@AllArgsConstructor
@Service
public class AuthService {

    private final UserService userService;
    private final MailServiceFactory mailServiceFactory;
    private final EmailVerificationCodeRedisService emailVerificationCodeRedisService;
    private final EmailVerifiedStatusRedisService emailVerifiedStatusRedisService;
    private final RefleshTokenRedisService refleshTokenRedisService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public SignInResponseDto signIn(SignInRequestDto body) {
        String email = emailFormat(body.getEmail());
        String password = body.getPassword();

        User user = userService.findUserByEmail(email)
                .orElseThrow(() -> new ChatException(ErrorCode.USER_404));

        if (!matchPassword(password, user.getPassword())) {
            throw new ChatException(ErrorCode.AUTH_401);
        }

        String accessToken = jwtTokenProvider.createToken(user.getPublicId(), user.getEmail(), user.getName(),
                user.getRole());
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getPublicId());

        refleshTokenRedisService.save(user.getPublicId(), refreshToken);
        SignInResponseDto responseDto = new SignInResponseDto(accessToken, refreshToken);

        return responseDto;

    }

    public void logout(String accessToken) {

        UUID publicId = jwtTokenProvider.getPublicId(accessToken);
        refleshTokenRedisService.delete(publicId);

    }

    public void signup(SignUpRequestDto body) {
        String email = emailFormat(body.getEmail());

        if (userService.emailExists(email))
            throw new ChatException(ErrorCode.EMAIL_DUPLICATE);

        String verifiedEmail = emailVerifiedStatusRedisService.find(email);

        if (!email.equals(verifiedEmail))
            throw new ChatException(ErrorCode.EMAIL_VERIFICATION_MISMATCH);

        String password = encodePassword(body.getPassword());
        User user = new User(email, password, body.getName(), UserRole.USER);

        userService.save(user);

        log.info("회원가입 완료: {}", email);
    }

    public void sendEmail(String to, HashMap<String, Object> messageMap, EmailType type) {
        if (userService.emailExists(emailFormat(to)))
            throw new ChatException(ErrorCode.EMAIL_DUPLICATE);

        MailService mailService = mailServiceFactory.getService(type);
        mailService.send(to, messageMap);
    }

    public VerityCodeResponseDto verifyEmailCode(String email, String code) {

        if (!emailVerificationCodeRedisService.exists(email))
            throw new ChatException(ErrorCode.INVALID_CODE);

        String savedCode = emailVerificationCodeRedisService.find(email);

        if (!savedCode.equals(code))
            throw new ChatException(ErrorCode.INVALID_CODE);

        emailVerifiedStatusRedisService.save(email);

        VerityCodeResponseDto responseDto = new VerityCodeResponseDto(email, code);

        return responseDto;
    }

    public SignInResponseDto refreshToken(String refreshToken) {
        if (refreshToken == null || refreshToken.isBlank())
            throw new ChatException(ErrorCode.MISSING_TOKEN);

        if (!jwtTokenProvider.validateToken(refreshToken))
            throw new ChatException(ErrorCode.INVALID_TOKEN);

        UUID publicId = jwtTokenProvider.getPublicId(refreshToken);

        String findRefreshToken = refleshTokenRedisService.find(publicId);

        if (findRefreshToken == null)
            throw new ChatException(ErrorCode.INVALID_TOKEN);

        if (!refreshToken.equals(findRefreshToken))
            throw new ChatException(ErrorCode.INVALID_TOKEN);

        User user = userService.findUserByPublicId(publicId)
                .orElseThrow(() -> new ChatException(ErrorCode.USER_404));

        String accessToken = jwtTokenProvider.createToken(user.getPublicId(),
                user.getEmail(), user.getName(), user.getRole());

        String newRefreshToken = jwtTokenProvider.createRefreshToken(publicId);

        SignInResponseDto responseBody = new SignInResponseDto(accessToken, newRefreshToken);

        return responseBody;

    }

    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    private boolean matchPassword(String password, String hashPassword) {
        return passwordEncoder.matches(password, hashPassword);
    }

    private String emailFormat(String email) {
        return email.toLowerCase();
    }
}
