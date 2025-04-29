package com.toy.chatapp.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class ChatMember {
    @Id
    @GeneratedValue
    private Long id;
    private User user;
    private ChatRoom chatRoom;
    private LocalDateTime joinedAt;

}
