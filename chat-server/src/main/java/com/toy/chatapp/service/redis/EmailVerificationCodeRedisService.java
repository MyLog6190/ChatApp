package com.toy.chatapp.service.redis;

import org.springframework.stereotype.Service;

import com.toy.chatapp.repository.redis.EmailVerificationCodeRedisRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@AllArgsConstructor
public class EmailVerificationCodeRedisService {
    private final EmailVerificationCodeRedisRepository emailVerificationCodeRedisRepository;

    public void save(String email, String code) {
        emailVerificationCodeRedisRepository.save(null, null);
    }

    public String find(String email) {
        return emailVerificationCodeRedisRepository.find(email);
    }

    public Boolean exists(String email) {
        return emailVerificationCodeRedisRepository.exists(email);
    }

}
