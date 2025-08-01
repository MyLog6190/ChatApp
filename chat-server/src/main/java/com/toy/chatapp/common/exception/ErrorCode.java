package com.toy.chatapp.common.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {

    // 인증 관련
    AUTH_401("AUTH_401", "인증이 필요합니다.", HttpStatus.UNAUTHORIZED),
    AUTH_403("AUTH_403", "권한이 없습니다.", HttpStatus.FORBIDDEN),
    INVALID_CODE("AUTH_422", "인증 코드가 유효하지 않거나 만료되었습니다.", HttpStatus.UNPROCESSABLE_ENTITY),
    EMAIL_VERIFICATION_MISMATCH("AUTH_412", "이메일 인증 정보가 일치하지 않습니다.", HttpStatus.PRECONDITION_FAILED),

    // 사용자 관련
    USER_404("USER_404", "사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    USER_DUPLICATE("USER_409", "이미 가입된 사용자입니다.", HttpStatus.CONFLICT),
    EMAIL_DUPLICATE("USER_409_EMAIL", "이미 사용 중인 이메일입니다.", HttpStatus.CONFLICT),

    // 채팅방 관련
    ROOM_404("ROOM_404", "채팅방을 찾을 수 없습니다.", HttpStatus.NOT_FOUND),
    ROOM_403("ROOM_403", "채팅방에 접근할 수 없습니다.", HttpStatus.FORBIDDEN),
    ROOM_FULL("ROOM_FULL", "채팅방 인원이 가득 찼습니다.", HttpStatus.BAD_REQUEST),

    // 메시지 관련
    MSG_400("MSG_400", "메시지 내용이 비어있습니다.", HttpStatus.BAD_REQUEST),
    MSG_413("MSG_413", "메시지 크기가 너무 큽니다.", HttpStatus.PAYLOAD_TOO_LARGE),
    MAIL_500("MAIL_500", "메일 전송 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR),

    // 서버 관련
    SERVER_500("SERVER_500", "서버 내부 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR),
    SERVER_TIMEOUT("SERVER_TIMEOUT", "서버 응답 시간이 초과되었습니다.", HttpStatus.GATEWAY_TIMEOUT),
    DB_ERROR("DB_ERROR", "데이터베이스 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);

    private final String code;
    private final String message;
    private final HttpStatus httpStatus;

    ErrorCode(String code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
