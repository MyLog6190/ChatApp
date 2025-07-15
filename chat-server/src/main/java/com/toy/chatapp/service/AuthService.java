package com.toy.chatapp.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.toy.chatapp.common.response.ApiResponse;
import com.toy.chatapp.dto.SignUpRequestDto;
import com.toy.chatapp.entity.User;
import com.toy.chatapp.enums.EmailType;
import com.toy.chatapp.factory.MailServiceFactory;
import com.toy.chatapp.repository.UserRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final MailServiceFactory mailServiceFactory;

    public void signup(SignUpRequestDto body) {
        User user = new User(body.getEmail(), body.getPasssword(), body.getName(), body.getRole());
        userRepository.save(user);
    }

    public void sendEmail(String to) {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000);
        HashMap<String, Object> map = new HashMap<>();
        map.put("code", code);

        MailService mailService = mailServiceFactory.getService(EmailType.VERIFICATION);
        mailService.send(to, (HashMap<String, Object>) map);
    }

}
