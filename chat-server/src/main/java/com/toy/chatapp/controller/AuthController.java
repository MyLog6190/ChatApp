package com.toy.chatapp.controller;

import java.net.HttpCookie;
import java.util.HashMap;
import java.util.Random;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toy.chatapp.common.response.ApiResponse;
import com.toy.chatapp.common.util.CookieUtil;
import com.toy.chatapp.dto.SignInRequestDto;
import com.toy.chatapp.dto.SignInResponseDto;
import com.toy.chatapp.dto.SignUpRequestDto;
import com.toy.chatapp.dto.VerifyEmailRequestDto;
import com.toy.chatapp.dto.VerityCodeRequestDto;
import com.toy.chatapp.dto.VerityCodeResponseDto;
import com.toy.chatapp.service.AuthService;

import io.swagger.v3.oas.annotations.headers.Header;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/auth/v1")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<SignInResponseDto>> login(HttpServletResponse response,
            @RequestBody SignInRequestDto body) {

        SignInResponseDto responseBody = authService.signIn(body);

        return ResponseEntity.ok(ApiResponse.success(responseBody));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<SignInResponseDto>> refresh(
            @RequestHeader("X-Refresh-Token") String refreshToken) {

        SignInResponseDto responseBody = authService.refreshToken(refreshToken);

        return ResponseEntity.ok(ApiResponse.success(responseBody));

    }

    @PostMapping("/logout")
    public void logout(@RequestBody String s) {
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<Void>> signUp(@RequestBody SignUpRequestDto body) {
        log.info("Signup request body {}", body.getPassword());
        authService.signup(body);
        return ResponseEntity.ok(ApiResponse.success(null));
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
        VerityCodeResponseDto responseBody = authService.verifyEmailCode(body.getEmail(), body.getCode());
        return ResponseEntity.ok(ApiResponse.success(responseBody));
    }
}
