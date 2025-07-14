package com.toy.chatapp.service;

import java.util.HashMap;
import java.util.Map;

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

    public ResponseEntity<ApiResponse<Void>> sendEmail() {
        try {
            MailService service = mailServiceFactory.getService(EmailType.VERIFICATION);
            Map<String, Object> map = new HashMap<>();
            service.send("", (HashMap<String, Object>) map);

            return null;
        } catch (Exception e) {
            log.error(null, e);
            return null;
        }
    }
}
