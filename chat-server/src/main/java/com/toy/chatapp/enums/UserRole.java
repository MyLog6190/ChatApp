package com.toy.chatapp.enums;

import jakarta.persistence.Embeddable;

@Embeddable // ENTITY에서 ENUM 사용할 때 사용
public enum UserRole {
    USER, ADMIN
}
