package com.toy.chatapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SignInResponseDto {
    String accessToken;
    String refreshToken;
}
