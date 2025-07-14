package com.toy.chatapp.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class FriendUser {
    @Id
    @GeneratedValue
    private Long id;

    private Long userId;

    private User friendUser;

    private LocalDateTime friendConnectedAt;
}
