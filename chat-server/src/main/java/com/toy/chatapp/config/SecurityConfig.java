package com.toy.chatapp.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity // Spring Security 활성화
@RequiredArgsConstructor
public class SecurityConfig {
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // SecurityFilterChain : HTTP 요청 보안 규칙칙을 정의한 "보안 필터 체인"
    // HttpSecurity : URL 허용/차단 대한 보안 규칙을 설정하는 DSL 객체
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF( Cross-Site Request Forgery ) 공격을 막기 위한 보안 설정 비활성화
                                              // API 서버는 세션을 사용하지 않음
                                              // 세션 대신 JWT 토큰을 사용
                                              // Form이 아닌 JSON을 사용
                                              // SameSite 설정으로 자동 전송 차단
                .cors(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
