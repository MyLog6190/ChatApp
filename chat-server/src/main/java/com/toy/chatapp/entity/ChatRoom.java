package com.toy.chatapp.entity;

import java.time.LocalDateTime;

import com.toy.chatapp.enums.ChatType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class ChatRoom {
    @Id
    @GeneratedValue
    private Long id;
    private ChatType chatType;
    private LocalDateTime createAt;
}
