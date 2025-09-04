import {useCallback, useRef, useState} from 'react';
import {APP_MESSAGES, MsgVariant} from '../constants/app-message';

type PopupState = {
  visible: boolean;
  variant: MsgVariant;
  title: string;
  message: string;
};

export function usePopup() {
  const [state, setState] = useState<PopupState>({
    visible: false,
    variant: 'info',
    title: '',
    message: '',
  });

  const onConfirmRef = useRef<(() => void) | undefined>(undefined); // ✅ 훅 내부로 이동

  const open = useCallback((code: string, opts?: {onConfirm?: () => void}) => {
    const msg = APP_MESSAGES[code] ?? APP_MESSAGES.UNKNOWN;
    onConfirmRef.current = opts?.onConfirm; // ✅ ref에 저장
    setState({
      visible: true,
      variant: msg.variant,
      title: msg.title,
      message: msg.content,
    });
  }, []);

  const confirm = useCallback(() => {
    const cb = onConfirmRef.current;
    onConfirmRef.current = undefined;
    setState(p => ({...p, visible: false}));
    setTimeout(() => cb?.(), 0); // ✅ 저장된 콜백 실행
  }, []);

  const close = useCallback(() => {
    onConfirmRef.current = undefined;
    setState(p => ({...p, visible: false}));
  }, []);

  return {state, open, confirm, close};
}
