package com.toy.chatapp.entity;

import com.toy.chatapp.enums.AuthProvider;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class UserProvider {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn()
    private User user;

    @Enumerated(EnumType.STRING)
    private AuthProvider provider; // KAKAO, GOOGLE, NAVER, GITHUB 등

    @Column(nullable = false)
    private String providerId; // 해당 플랫폼의 고유 유저 ID

    @Column(nullable = false)
    private String email; // 해당 플랫폼에서 받은 이메일
}
