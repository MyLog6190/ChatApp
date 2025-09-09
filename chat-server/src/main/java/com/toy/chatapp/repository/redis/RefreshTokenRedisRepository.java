package com.toy.chatapp.repository.redis;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
public class RefreshTokenRedisRepository {
    private static String PREFIX = "refresh:user:";

    private final RedisTemplate<String, String> redisTemplate;

    RefreshTokenRedisRepository(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void save(UUID publicId, String refreshToken) {
        redisTemplate.opsForValue().set(PREFIX + publicId, refreshToken, 7, TimeUnit.DAYS);
    }

    public String find(UUID publicId) {
        String findRefreshToken = redisTemplate.opsForValue().get(PREFIX + publicId);
        return findRefreshToken;
    }

    public void delete(UUID publicId) {
        redisTemplate.delete(PREFIX + publicId);
    }

}
