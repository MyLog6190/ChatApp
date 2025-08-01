package com.toy.chatapp.service.redis;

import org.springframework.stereotype.Service;

import com.toy.chatapp.repository.redis.EmailVerifiedStatusRedisRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@AllArgsConstructor
public class EmailVerifiedStatusRedisService {
    private final EmailVerifiedStatusRedisRepository emailVerifiedStatusRedisRepository;

    public void save(String email) {
        emailVerifiedStatusRedisRepository.save(email);
    }

    public String find(String email) {
        return emailVerifiedStatusRedisRepository.find(email);
    }

}
