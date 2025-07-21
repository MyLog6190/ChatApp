package com.toy.chatapp.service;

import java.util.HashMap;
import java.util.Random;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.toy.chatapp.common.exception.ChatException;
import com.toy.chatapp.dto.SignUpRequestDto;
import com.toy.chatapp.entity.User;
import com.toy.chatapp.enums.EmailType;
import com.toy.chatapp.factory.MailServiceFactory;
import com.toy.chatapp.repository.UserRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final MailServiceFactory mailServiceFactory;
    private final RedisTemplate<String, String> redisTemplate;

    public void signup(SignUpRequestDto body) {
        User user = new User(body.getEmail(), body.getPasssword(), body.getName(), body.getRole());
        userRepository.save(user);
    }

    public void sendEmail(String to, HashMap<String, Object> messageMap, EmailType type) {
        MailService mailService = mailServiceFactory.getService(type);
        mailService.send(to, messageMap);
    }

    public Integer generate6DigitCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000);
        return code;
    };

}
