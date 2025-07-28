package com.toy.chatapp.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import com.toy.chatapp.enums.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;

@Entity
@Getter
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, updatable = false)
    private UUID publicId = UUID.randomUUID();

    private String email;

    private String password;

    private String name;

    @Enumerated(EnumType.STRING) // ENTITY에서 ENUM 사용할 때 사용
    private UserRole role;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    public User(String email, String password, String name, UserRole role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
    }

}
