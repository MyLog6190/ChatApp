package com.toy.chatapp.controller;

import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.toy.chatapp.entity.User;
import com.toy.chatapp.service.UserService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/user/v1")
public class UserController {

    private UserService userService;

    @GetMapping("/profile")
    public Optional<User> getProfile(@RequestHeader("Authorization") String accessToken) {
        Optional<User> user = userService.findUserByPublicId(null);
        return user;
    }

}
