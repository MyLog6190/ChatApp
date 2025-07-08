package com.toy.chatapp.service;

import java.util.HashMap;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.toy.chatapp.annotation.MailStrategy;
import com.toy.chatapp.enums.EmailType;

import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@MailStrategy(type = EmailType.VERIFICATION)
public class VerificationMailService implements MailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Override
    public void send(String to, HashMap<String, Object> params) {
        try {
            // 1. Thymeleaf의 Context 객체 생성 → 템플릿에서 사용할 변수들을 담는 컨테이너
            Context context = new Context();

            // 2. 전달받은 변수들을 context에 넣음 (ex: name, verifyUrl 등)
            context.setVariables(params);

            // 3. "email/verify.html" 템플릿 파일을 Thymeleaf로 렌더링하여 HTML 문자열 생성
            // → templates/email/verify.html 내부의 ${name}, ${verifyUrl} 등을 치환함
            String htmlContent = templateEngine.process("email/verify", context);

            // 4. JavaMailSender를 이용해 전송할 MimeMessage 객체 생성 (HTML, 첨부 등 가능)
            MimeMessage message = mailSender.createMimeMessage();

            // 5. MimeMessageHelper는 MimeMessage를 쉽게 설정하기 위한 도우미 클래스
            // 두 번째 파라미터 true → 멀티파트(HTML, 첨부파일 등) 허용
            // 세 번째 "UTF-8" → 인코딩 설정
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            // 6. 수신자 설정 (메일 받을 사람)
            helper.setTo(to);

            // 7. 메일 제목 설정
            helper.setSubject("이메일 인증 안내");

            // 8. 본문 내용 설정 (htmlContent를 HTML 형식으로 보냄 → true 설정 필수!)
            helper.setText(htmlContent, true);

            // 9. 최종적으로 메일을 발송함
            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
