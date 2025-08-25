package com.toy.chatapp.dto;

import com.toy.chatapp.enums.EmailType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VerifyEmailRequestDto {
    private String email;
    private EmailType type;
}
