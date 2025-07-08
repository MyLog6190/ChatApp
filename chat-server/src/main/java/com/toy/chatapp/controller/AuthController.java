package com.toy.chatapp.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toy.chatapp.dto.SignUpRequestDto;
import com.toy.chatapp.service.AuthService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/auth/v1")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public void login(@RequestBody String a) {

    }

    @PostMapping("/logout")
    public void logout(@RequestBody String s) {
    }

    @PostMapping("/signup")
    public void signUp(@RequestBody SignUpRequestDto body) {
        authService.signup(body);
    }

}
