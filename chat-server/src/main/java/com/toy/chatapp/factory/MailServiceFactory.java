package com.toy.chatapp.factory;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.toy.chatapp.annotation.MailStrategy;
import com.toy.chatapp.enums.EmailType;
import com.toy.chatapp.service.MailService;

//? Map으로 전략 주입하는 이유
//? EmailType마다 if문으로 new MailService로 생성하지 않고 Map 맵핑하여 사용하는 이유
//* Bean(MailServiceFactory)으로 생성하여 재사용
//* 의존성 주입 strategyMap 안에 들어가는 객체들 자동으로 의존성 추가
//* enum, mailService 구현 클래스 추가하면 코드 변경 없음

@Component
public class MailServiceFactory {

    // MailType(enum)을 키로, MailService 구현체를 값으로 매핑한 Map
    private final Map<EmailType, MailService> strategyMap = new EnumMap<>(EmailType.class);

    public MailServiceFactory(List<MailService> services) {
        services.forEach((service) -> {
            // MailStrategy 어노테이션으로 타입 지정한 클래스 가져오기
            MailStrategy annotation = service.getClass().getAnnotation(MailStrategy.class);
            if (annotation != null) {
                // Email타입 별로 구현체 맵핑
                strategyMap.put(annotation.type(), service);
            }
        });
    }

    // 메일 타입을 기준으로 해당 타입의 MailService를 꺼내주는 메서드
    public MailService getService(EmailType type) {
        return strategyMap.get(type); // ex: BASIC → BasicMailService
    }
}
