package com.toy.chatapp.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class CustomerService {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String content;
    private String write;
    private LocalDateTime createAt;
}
