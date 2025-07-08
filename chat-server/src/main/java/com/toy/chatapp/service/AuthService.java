package com.toy.chatapp.service;

import org.springframework.stereotype.Service;

import com.toy.chatapp.dto.SignUpRequestDto;
import com.toy.chatapp.entity.User;
import com.toy.chatapp.repository.UserRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class AuthService {
    private final UserRepository userRepository;

    public void signup(SignUpRequestDto body) {
        try {
            User user = new User(body.getEmail(), body.getPasssword(), body.getName(), body.getRole());
            userRepository.save(user);
        } catch (Exception e) {
            log.error("회원가입 에러", e);
        }
    }
}
