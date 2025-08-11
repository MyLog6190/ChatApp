package com.toy.chatapp.common.util;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {
    // 웹에서 사용 앱은 필요 없다네
    public ResponseCookie buildRefreshCookie(String refreshToken) {
        return ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .path("/auth/v1/refresh")
                .maxAge(60 * 60 * 24 * 14)
                .build();
    }

    public ResponseCookie expireREfreshCookie(String refreshToken) {
        return ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .path("/auth/v1/refresh")
                .maxAge(0)
                .build();
    }

}
