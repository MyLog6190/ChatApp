package com.toy.chatapp.service.redis;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.toy.chatapp.repository.redis.RefreshTokenRedisRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class RefleshTokenRedisService {

    private RefreshTokenRedisRepository refleshTokenRedisRepository;

    public void save(UUID publicId, String refleshToken) {
        refleshTokenRedisRepository.save(publicId, refleshToken);
    }

    public String find(UUID publicId) {
        log.info("redis find public Id : {}  ", publicId);
        log.info("redis find refresh : {}", refleshTokenRedisRepository.find(publicId));
        return refleshTokenRedisRepository.find(publicId);
    }

    public void delete(UUID publicId) {
        refleshTokenRedisRepository.delete(publicId);
    }

}
