package com.toy.chatapp.dto;

import com.toy.chatapp.enums.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpRequestDto {
    private String email;
    private String passsword;
    private String name;
    private UserRole role;
}
