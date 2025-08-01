package com.toy.chatapp.repository.redis;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
public class EmailVerifiedStatusRedisRepository {

    private static final String PREEFIX = "verified:session:";
    private static final long TTL = 1800;

    private final RedisTemplate<String, String> redisTemplate;

    EmailVerifiedStatusRedisRepository(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void save(String email) {
        redisTemplate.opsForValue().set(PREEFIX + email, email, TTL, TimeUnit.SECONDS);
    }

    public String find(String email) {
        return redisTemplate.opsForValue().get(PREEFIX + email);
    }

    public void delete(String email) {
        redisTemplate.delete(PREEFIX + email);
    }

    public boolean exists(String email) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(PREEFIX + email));
    }
}
