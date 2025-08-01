package com.toy.chatapp.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.toy.chatapp.enums.EmailType;

// Target 커스텀 어노테이션을 어디에 붙일 지 결정
// ElementType.TYPE → 클래스, 인터페이스, 열거형(enum) 에 사용 가능.
@Target(ElementType.TYPE)
// 어노테이션 살아있는 지점 지정
@Retention(RetentionPolicy.RUNTIME) // 런타임에도 유지됨
// JavaDoc에 포함할 지 여부
@Documented
public @interface MailStrategy {
    EmailType type();
}
