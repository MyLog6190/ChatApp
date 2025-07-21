package com.toy.chatapp.dto;

import com.toy.chatapp.enums.EmailType;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class VerifyEmailRequestDto {
    String email;
    EmailType type;
}
