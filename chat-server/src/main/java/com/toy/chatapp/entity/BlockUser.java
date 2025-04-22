package com.toy.chatapp.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class BlockUser {
    @Id
    @GeneratedValue
    private Long id;

    private Long userId;
    /**
     * ? BlockUser를 조회하여 Join해서 가져오는게 낫나?
     * ? 연관관계 맵핑해서 가져오려면 userId로 연결해서 조회해야하고
     * ? block user 데이터도 필요하니깐 양쪽으로 ManyToOne으로 조회해야하는데
     * ? 어느쪽이 더 효율적인지?
     * ? BlockUser 따로 조회하는게 더 효율적인 것 같기도 한데 ?
     */
    private User blockId;

    private LocalDateTime blockedAt;

}
