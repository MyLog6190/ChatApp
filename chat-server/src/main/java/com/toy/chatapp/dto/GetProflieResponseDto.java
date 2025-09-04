package com.toy.chatapp.dto;

import java.util.UUID;

import com.toy.chatapp.entity.User;
import com.toy.chatapp.enums.UserRole;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GetProflieResponseDto {
    private UUID publicId;
    private String email;
    private String name;
    private UserRole role;

    public GetProflieResponseDto(User user) {
        this.publicId = user.getPublicId();
        this.email = user.getEmail();
        this.name = user.getName();
        this.role = user.getRole();
    }
}
