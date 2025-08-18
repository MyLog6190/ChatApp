package com.toy.chatapp.security.handler;

import java.io.IOException;
import java.security.SignatureException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {

        Object exception = request.getAttribute("jwt_exception");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json;charset=UTF-8");
        String msg = "Unautheorized";

        if (exception instanceof ExpiredJwtException)
            msg = "Token expired";

        else if (exception instanceof SignatureException)
            msg = "Invalid token";

        else if (exception instanceof MalformedJwtException)
            msg = "Malformed";

        response.getWriter().write("{\"error\":\"" + msg + "\"}");

    }
}
