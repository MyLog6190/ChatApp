import {useState} from 'react';
import {APP_MESSAGES} from '../utils/appMessage';

const INITIAL = {
  visible: false,
  variant: 'info',
  title: '',
  content: '',
};

export function usePopup() {
  const [state, setState] = useState({
    visible: false,
    variant: 'info',
    title: '',
    message: '',
  });

  const open = (code: string) => {
    const msg = APP_MESSAGES[code] ?? APP_MESSAGES.UNKNOWN;
    setState({
      visible: true,
      variant: msg.variant,
      title: msg.title,
      message: msg.content,
    });
  };

  const close = () => setState(popup => ({...popup, visible: false}));

  return {state, open, close};
}
