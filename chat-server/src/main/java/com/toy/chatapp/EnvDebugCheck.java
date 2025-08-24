package com.toy.chatapp;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class EnvDebugCheck {

    @Value("${CHATAPP_DB_HOST:NOT_FOUND}")
    private String dbHost;

    @Value("${REDIS_HOST:NOT_FOUND}")
    private String redisHost;

    @PostConstruct
    public void logEnv() {
        System.out.println("-- DB HOST -- : " + dbHost);
        System.out.println("-- REDIS_HOST -- : " + redisHost);
    }
}
