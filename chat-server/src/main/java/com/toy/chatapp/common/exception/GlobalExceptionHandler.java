package com.toy.chatapp.common.exception;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.toy.chatapp.common.response.ApiResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 내가 직접 에러 발생
    @ExceptionHandler(ChatException.class)
    public ResponseEntity<ApiResponse<Void>> handleChatException(ChatException ex) {
        ErrorCode errorCode = ex.getErrorCode();
        return ResponseEntity
                .status(errorCode.getHttpStatus())
                .body(ApiResponse.fail(errorCode.getCode(), errorCode.getMessage()));
    }

    @ExceptionHandler({
            DataIntegrityViolationException.class, // ex: UNIQUE, FK 위반
            ConstraintViolationException.class, // ex: Bean Validation
            TransactionSystemException.class // ex: 내부에서 ConstraintViolation 발생 시 래핑됨
    })
    public ResponseEntity<ApiResponse<Void>> handleDatabaseException(Exception ex) {
        log.warn("Database Exception", ex);
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.fail(ErrorCode.SERVER_500.getCode(), ErrorCode.SERVER_500.getMessage()));
    }

    // 기타 모든 에러 -> 의도적으로 발생시킨 에러 제외한 모든 에러
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGenericException(Exception ex) {
        log.error("Unhandled Exception", ex);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.fail(ErrorCode.SERVER_500.getCode(), ErrorCode.SERVER_500.getMessage()));
    }
}
