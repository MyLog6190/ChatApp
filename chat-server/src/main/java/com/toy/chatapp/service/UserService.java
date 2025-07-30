package com.toy.chatapp.service;

import org.springframework.stereotype.Service;

import com.toy.chatapp.entity.User;
import com.toy.chatapp.repository.UserRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

}
