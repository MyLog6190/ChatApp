package com.toy.chatapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대해 CORS 허용
                .allowedOrigins("*") // 모든 IP 허용
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE") // Header Method 타입 허용
                .allowedHeaders("*") // 모든 Header에 응답 허용
                .maxAge(3600); // 캐시 유지 시간
    }

}
