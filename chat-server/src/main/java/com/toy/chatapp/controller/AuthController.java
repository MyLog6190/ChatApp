package com.toy.chatapp.controller;

import java.util.HashMap;
import java.util.Random;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toy.chatapp.common.response.ApiResponse;
import com.toy.chatapp.dto.SignUpRequestDto;
import com.toy.chatapp.dto.VerifyEmailRequestDto;
import com.toy.chatapp.dto.VerityCodeRequestDto;
import com.toy.chatapp.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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

        authService.signup(body);
        return null;
    }

    @PostMapping(value = "/send-email", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<Object>> sendEmail(HttpServletRequest request,
            @RequestBody VerifyEmailRequestDto body) {

        Random random = new Random();
        int code = 100000 + random.nextInt(900000);

        HashMap<String, Object> map = new HashMap<>();
        map.put("code", code);

        authService.sendEmail(body.getEmail(), (HashMap<String, Object>) map, body.getType());

        return ResponseEntity.ok(ApiResponse.success(null)); // 또는 success()

    }

    @PostMapping("/verify-code")
    public ResponseEntity<ApiResponse<Object>> verifyEmailCode(@RequestBody VerityCodeRequestDto body) {
        boolean confirm = authService.verifyEmailCode(body.getEmail(), body.getCode());
        return ResponseEntity.ok(ApiResponse.success(confirm));
    }
}
