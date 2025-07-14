package com.toy.chatapp.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toy.chatapp.common.response.ApiResponse;
import com.toy.chatapp.dto.SignUpRequestDto;
import com.toy.chatapp.enums.EmailType;
import com.toy.chatapp.factory.MailServiceFactory;
import com.toy.chatapp.service.AuthService;
import com.toy.chatapp.service.MailService;

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
    public ResponseEntity<ApiResponse<Void>> signUp(@RequestBody SignUpRequestDto body) {
        return authService.signup(body);
    }

    @PostMapping("/send-email")
    public ResponseEntity<ApiResponse<Void>> sendEmail(@RequestBody String body) {
        return authService.sendEmail();
    }
}
