package com.toy.chatapp.entity;

import java.time.LocalDateTime;

import com.toy.chatapp.enums.MessageType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long sender;
    private Long chatRoomId;
    @Enumerated(EnumType.STRING)
    private MessageType messageType;
    private String content;

    private LocalDateTime createAt;
}
