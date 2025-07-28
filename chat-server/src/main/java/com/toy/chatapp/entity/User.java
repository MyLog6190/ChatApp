package com.toy.chatapp.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;
import org.hibernate.type.SqlTypes;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.toy.chatapp.enums.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 36, columnDefinition = "VARCHAR(36)")
    @JdbcTypeCode(SqlTypes.CHAR)
    private UUID publicId = UUID.randomUUID();

    private String email;

    private String password;

    private String name;

    @Enumerated(EnumType.STRING) // ENTITY에서 ENUM 사용할 때 사용
    private UserRole role;

    private LocalDateTime createAt = LocalDateTime.now();

    private LocalDateTime updateAt = LocalDateTime.now();

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User(String email, String password, String name, UserRole role) {
        this.email = email;
        this.password = encoder.encode(password);
        this.name = name;
        this.role = role;
    }

}
