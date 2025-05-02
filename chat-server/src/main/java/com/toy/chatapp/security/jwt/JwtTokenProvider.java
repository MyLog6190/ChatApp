package com.toy.chatapp.security.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.toy.chatapp.enums.UserRole;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtTokenProvider {
    @Value("${secretKey}")
    private String secretKey;
    private long validTime = 1000 * 60 * 30;

    private Key key;

    @PostConstruct // 의존성 주입 후 실행
    protected void init() {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    // 토큰 생성
    public String createToken(UUID publicId, UserRole role) {
        Claims claims = Jwts.claims().setSubject(publicId.toString());
        claims.put("role", role);

        Date now = new Date();
        Date expirationTime = new Date(now.getTime() + validTime);

        return Jwts.builder().setClaims(claims).setIssuedAt(now).setExpiration(expirationTime)
                .signWith(key, SignatureAlgorithm.HS256).compact();
    }

    // UUID 추출
    public UUID getPublicId(String token) {
        return UUID.fromString(
                Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject());
    }

    // 유효한 토큰인지 검증
    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            return !claims.getBody().getExpiration().before(new Date());

        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
