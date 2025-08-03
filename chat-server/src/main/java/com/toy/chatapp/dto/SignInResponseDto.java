package com.toy.chatapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignInResponseDto {
    String accessToken;
    String refreshToken;
}
