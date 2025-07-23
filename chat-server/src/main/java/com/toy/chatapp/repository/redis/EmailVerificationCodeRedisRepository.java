package com.toy.chatapp.repository.redis;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
public class EmailVerificationCodeRedisRepository {
    private static final String PREEFIX = "verify:email:";
    private static final long TTL = 600;

    private final RedisTemplate<String, String> redisTemplate;

    public EmailVerificationCodeRedisRepository(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void save(String email, String code) {
        redisTemplate.opsForValue().set(PREEFIX + email, code, TTL, TimeUnit.SECONDS);
    }

    public String find(String email) {
        return redisTemplate.opsForValue().get(PREEFIX + email);
    }

    public void delete(String email) {
        redisTemplate.delete(PREEFIX + email);
    }

    public Boolean exists(String email) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(PREEFIX + email));
    }
}
