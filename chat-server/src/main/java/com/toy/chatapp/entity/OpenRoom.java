package com.toy.chatapp.entity;

import jakarta.persistence.Entity;
import lombok.Getter;

@Entity
@Getter
public class OpenRoom extends ChatRoom {
    private String title;
    private Boolean isChatAdmin;
    private String password;
}
