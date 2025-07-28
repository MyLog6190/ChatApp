package com.toy.chatapp;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class EnvDebugCheck {

    @Value("${GMAIL:NOT_FOUND}")
    private String gmail;

    @PostConstruct
    public void logEnv() {
        System.out.println("📬-- GMAIL -- : " + gmail);
    }
}
