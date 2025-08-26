// utils/appMessages.ts
export type MsgVariant = 'success' | 'error' | 'info';

export type AppMessage = {
  variant: MsgVariant;
  title: string;
  content: string;
};

type Dict = Record<string, AppMessage>;

export const APP_MESSAGES: Dict = {
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

  AUTH_422: {
    variant: 'error',
    title: '전송 실패',
    content: '인증 코드가 유효하지 않거나 만료되었습니다.',
  },
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
