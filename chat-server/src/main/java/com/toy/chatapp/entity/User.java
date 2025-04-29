package com.toy.chatapp.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.toy.chatapp.enums.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;

@Entity
@Getter
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true, nullable = false, updatable = false)
    private UUID publicId = UUID.randomUUID();

    private String email;

    private String password;

    private String name;

    @Embedded // ENTITY에서 ENUM 사용할 때 사용
    private UserRole role;

    @OneToMany
    private List<BlockUser> blockUsers = new ArrayList<>();

    private LocalDateTime createAt;
}
