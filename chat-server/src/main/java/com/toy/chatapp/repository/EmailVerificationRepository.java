package com.toy.chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toy.chatapp.entity.EmailVerification;

public interface EmailVerificationRepository extends JpaRepository<EmailVerification, Long> {
    EmailVerification save(EmailVerification emailVerification);
}
