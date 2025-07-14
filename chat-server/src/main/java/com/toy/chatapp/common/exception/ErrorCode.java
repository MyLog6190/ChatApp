package com.toy.chatapp.common.res;

public enum ErrorCode {
    AUTH_401("AUTH_401", "인증이 필요합니다."),
    AUTH_403("AUTH_403", "권한이 없습니다."),
    USER_404("USER_404", "사용자를 찾을 수 없습니다."),
    USER_DUPLICATE("USER_DUPLICATE", "이미 가입된 사용자입니다."),
    ROOM_404("ROOM_404", "채팅방을 찾을 수 없습니다."),
    ROOM_403("ROOM_403", "채팅방에 접근할 수 없습니다."),
    ROOM_FULL("ROOM_FULL", "채팅방 인원이 가득 찼습니다."),
    MSG_400("MSG_400", "메시지 내용이 비어있습니다."),
    MSG_413("MSG_413", "메시지 크기가 너무 큽니다."),
    SERVER_500("SERVER_500", "서버 내부 오류가 발생했습니다."),
    SERVER_TIMEOUT("SERVER_TIMEOUT", "서버 응답 시간이 초과되었습니다.");

    private final String code;
    private final String message;

    ErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
