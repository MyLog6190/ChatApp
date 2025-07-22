package com.toy.chatapp.service;

import java.util.HashMap;

import org.springframework.stereotype.Service;

import com.toy.chatapp.dto.SignUpRequestDto;
import com.toy.chatapp.entity.User;
import com.toy.chatapp.enums.EmailType;
import com.toy.chatapp.factory.MailServiceFactory;
import com.toy.chatapp.repository.UserRepository;
import com.toy.chatapp.repository.redis.EmailVerificationCodeRedisRepository;
import com.toy.chatapp.repository.redis.EmailVerifiedStatusRedisRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@AllArgsConstructor
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final MailServiceFactory mailServiceFactory;
    private final EmailVerificationCodeRedisRepository emailVerificationCodeRedisRepository;
    private final EmailVerifiedStatusRedisRepository emailVerifiedStatusRedisRepository;

    public void signup(SignUpRequestDto body) {
        User user = new User(body.getEmail(), body.getPasssword(), body.getName(), body.getRole());
        userRepository.save(user);
    }

    public void sendEmail(String to, HashMap<String, Object> messageMap, EmailType type) {
        MailService mailService = mailServiceFactory.getService(type);
        mailService.send(to, messageMap);
    }

    public boolean verifyEmail(String email, String code) {
        emailVerificationCodeRedisRepository.find(email);
        emailVerifiedStatusRedisRepository.save(email);
        return true;
    }
}
