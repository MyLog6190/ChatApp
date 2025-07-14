package com.toy.chatapp.service;

import java.util.HashMap;
import java.util.Locale;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.toy.chatapp.annotation.MailStrategy;
import com.toy.chatapp.enums.EmailType;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@MailStrategy(type = EmailType.VERIFICATION)
@Slf4j
public class VerificationMailService implements MailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Override
    public void send(String to, HashMap<String, Object> params) {
        try {
            Context context = new Context(Locale.KOREA);
            context.setVariables(params);
            String html = templateEngine.process("email/verify", context); // ✔ 템플릿 하드코딩

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject("이메일 인증 안내"); // ✔ 제목 하드코딩
            helper.setText(html, true);

            mailSender.send(message);
        } catch (MessagingException e) {
            log.error("메일 생성 또는 전송 실패", e);
        }

    }

}
