package com.toy.chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toy.chatapp.entity.EmailVerification;

public interface EmailVerificationRepository extends JpaRepository<Long, EmailVerification> {

    void save(EmailVerification emailVerification);
}
