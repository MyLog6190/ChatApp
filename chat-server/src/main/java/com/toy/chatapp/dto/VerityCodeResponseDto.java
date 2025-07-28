package com.toy.chatapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class VerityCodeResponseDto {
    private String email;
    private String code;
}
