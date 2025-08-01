package com.toy.chatapp.service;

import java.util.HashMap;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.toy.chatapp.common.exception.ChatException;
import com.toy.chatapp.common.exception.ErrorCode;
import com.toy.chatapp.dto.SignUpRequestDto;
import com.toy.chatapp.dto.VerityCodeResponseDto;
import com.toy.chatapp.entity.User;
import com.toy.chatapp.enums.EmailType;
import com.toy.chatapp.factory.MailServiceFactory;
import com.toy.chatapp.service.redis.EmailVerificationCodeRedisService;
import com.toy.chatapp.service.redis.EmailVerifiedStatusRedisService;

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
    private final BCryptPasswordEncoder passwordEncoder;

    public void signup(SignUpRequestDto body) {
        String email = body.getEmail();
        if (userService.emailExists(email))
            throw new ChatException(ErrorCode.EMAIL_DUPLICATE);

        String verifiedEmail = emailVerifiedStatusRedisService.find(email);

        if (!email.equals(verifiedEmail))
            throw new ChatException(ErrorCode.EMAIL_VERIFICATION_MISMATCH);

        String password = encodePassword(body.getPassword());
        User user = new User(email, password, body.getName(), body.getRole());

        userService.save(user);
    }

    public void sendEmail(String to, HashMap<String, Object> messageMap, EmailType type) {
        if (userService.emailExists(to))
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

    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    private boolean matchPassword(String password, String hashPassword) {
        return passwordEncoder.matches(password, hashPassword);
    }
}
