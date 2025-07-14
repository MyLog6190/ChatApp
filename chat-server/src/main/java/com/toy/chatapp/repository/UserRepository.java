package com.toy.chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toy.chatapp.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
}