package com.toy.chatapp.repository.redis;

import java.util.UUID;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
public class RefreshTokenRedisRepository {
    private static String PREEFIX = "refresh:user:";

    private final RedisTemplate<String, String> redisTemplate;

    RefreshTokenRedisRepository(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void save(UUID publicId, String refreshToken) {
        redisTemplate.opsForValue().set(PREEFIX + publicId, refreshToken);
    }

    public String find(UUID publicId) {
        String findRefreshToken = redisTemplate.opsForValue().get(PREEFIX + publicId);
        return findRefreshToken;
    }

}
