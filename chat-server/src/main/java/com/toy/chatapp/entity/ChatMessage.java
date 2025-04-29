package com.toy.chatapp.entity;

import java.time.LocalDateTime;

import com.toy.chatapp.enums.MessageType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class ChatMessage {

    @Id
    @GeneratedValue
    private Long id;

    private User sender;
    private ChatRoom chatRoom;
    private MessageType messageType;
    private String content;

    private LocalDateTime createAt;
}
