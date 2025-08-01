package com.toy.chatapp.common.exception;

public class ChatException extends RuntimeException {
    private final ErrorCode errorCode;

    public ChatException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

}
