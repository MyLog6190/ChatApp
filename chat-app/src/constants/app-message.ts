// utils/appMessages.ts
export type MsgVariant = 'success' | 'error' | 'info';

export type AppMessage = {
  variant: MsgVariant;
  title: string;
  content: string;
};

type Dict = Record<string, AppMessage>;

export const APP_MESSAGES: Dict = {
  // 로컬(클라이언트) 메시지
  INVALID_EMAIL: {
    variant: 'error',
    title: '전송 실패',
    content: '올바른 이메일 형식이 아닙니다.',
  },
  EMAIL_SENT: {
    variant: 'success',
    title: '전송 성공',
    content: '인증 코드가 발송되었습니다.\n메일을 확인해 주세요.',
  },
  FORM_INVALID: {
    variant: 'error',
    title: '입력 오류',
    content: '입력값을 확인해 주세요.',
  },
  EMAIL_REQUIRED: {
    variant: 'error',
    title: '입력 오류',
    content: '이메일을 입력해 주세요.',
  },
  CODE_REQUIRED: {
    variant: 'error',
    title: '인증 필요',
    content: '인증 코드를 입력해 주세요.',
  },
  CODE_VERIFY_REQUIRED: {
    variant: 'info',
    title: '인증 필요',
    content: '이메일로 받은 인증 코드를 입력하고 \n확인 버튼을 눌러 주세요.',
  },
  NAME_REQUIRED: {
    variant: 'error',
    title: '입력 오류',
    content: '이름을 입력해 주세요.',
  },
  PASSWORD_REQUIRED: {
    variant: 'error',
    title: '입력 오류',
    content: '비밀번호를 입력해 주세요.',
  },
  CONFIRM_PASSWORD_REQUIRED: {
    variant: 'error',
    title: '입력 오류',
    content: '비밀번호를 다시 입력해 주세요.',
  },
  PASSWORD_MISMATCH_CLIENT: {
    variant: 'error',
    title: '입력 오류',
    content: '비밀번호가 일치하지 않습니다.',
  },

  // 인증 관련 (서버 코드와 동일한 키)
  AUTH_401: {
    variant: 'error',
    title: '인증 필요',
    content: '인증이 필요합니다.',
  },
  AUTH_403: {
    variant: 'error',
    title: '권한 없음',
    content: '권한이 없습니다.',
  },
  AUTH_405: {
    variant: 'error',
    title: '토큰 오류',
    content: '토큰이 유효하지 않습니다.',
  },
  AUTH_406: {
    variant: 'error',
    title: '인증 실패',
    content: '인증 토큰이 존재하지 않습니다.',
  },
  AUTH_412: {
    variant: 'error',
    title: '이메일 인증 실패',
    content: '이메일 인증 정보가 일치하지 않습니다.',
  },
  AUTH_422: {
    variant: 'error',
    title: '전송 실패',
    content: '인증 코드가 유효하지 않거나 만료되었습니다.',
  },
  AUTH_423: {
    variant: 'error',
    title: '비밀번호 오류',
    content: '비밀번호가 일치하지 않습니다.',
  },

  // 사용자 관련
  USER_404: {
    variant: 'error',
    title: '사용자 없음',
    content: '사용자를 찾을 수 없습니다.',
  },
  USER_409: {
    variant: 'error',
    title: '중복 가입',
    content: '이미 가입된 사용자입니다.',
  },
  USER_409_EMAIL: {
    variant: 'error',
    title: '이메일 중복',
    content: '이미 사용 중인 이메일입니다.',
  },

  // 채팅방 관련
  ROOM_404: {
    variant: 'error',
    title: '채팅방 없음',
    content: '채팅방을 찾을 수 없습니다.',
  },
  ROOM_403: {
    variant: 'error',
    title: '접근 제한',
    content: '채팅방에 접근할 수 없습니다.',
  },
  ROOM_FULL: {
    variant: 'error',
    title: '입장 불가',
    content: '채팅방 인원이 가득 찼습니다.',
  },

  // 메시지 관련
  MSG_400: {
    variant: 'error',
    title: '전송 실패',
    content: '메시지 내용이 비어있습니다.',
  },
  MSG_413: {
    variant: 'error',
    title: '전송 실패',
    content: '메시지 크기가 너무 큽니다.',
  },
  MAIL_500: {
    variant: 'error',
    title: '메일 오류',
    content: '메일 전송 중 오류가 발생했습니다.',
  },

  // 서버 관련
  SERVER_500: {
    variant: 'error',
    title: '서버 오류',
    content: '서버 내부 오류가 발생했습니다.',
  },
  SERVER_TIMEOUT: {
    variant: 'error',
    title: '서버 지연',
    content: '서버 응답 시간이 초과되었습니다.',
  },
  DB_ERROR: {
    variant: 'error',
    title: 'DB 오류',
    content: '데이터베이스 오류가 발생했습니다.',
  },

  // 기타
  NETWORK_ERROR: {
    variant: 'error',
    title: '네트워크 오류',
    content: '네트워크 상태를 확인하고 다시 시도해 주세요.',
  },
  UNKNOWN: {
    variant: 'info',
    title: '알림',
    content: '요청을 처리하지 못했습니다.',
  },
};
