package com.toy.chatapp.service;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Locale;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.toy.chatapp.annotation.MailStrategy;
import com.toy.chatapp.common.exception.ChatException;
import com.toy.chatapp.common.exception.ErrorCode;
import com.toy.chatapp.enums.EmailType;
import com.toy.chatapp.repository.redis.EmailVerificationCodeRedisRepository;

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
    private final EmailVerificationCodeRedisRepository emailVerificationCodeRedisRepository;

    @Override
    public void send(String to, HashMap<String, Object> params) {
        try {
            Context context = new Context(Locale.KOREA);
            context.setVariables(params);

            System.out.println(getClass().getClassLoader().getResource("templates/email/verify.html"));

            String html = templateEngine.process("email/verify", context);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setFrom("adg6190@gmail.com", "CHAT APP");
            helper.setSubject("[CHAT APP] 이메일 인증 코드");
            helper.setText(html, true);

            emailVerificationCodeRedisRepository.save(to, params.get("code").toString());
            mailSender.send(message);
        } catch (MessagingException e) {
            log.error("MessagingException", e);
            throw new ChatException(ErrorCode.MAIL_500);
        } catch (UnsupportedEncodingException e) {
            log.error("UnsupportedEncodingException", e);
            throw new ChatException(ErrorCode.MAIL_500);
        }
    }

}
