import {homeNavigations} from '../constants/naviations';

// 스택 파라미터 리스트
export type HomeStackParamList = {
  [homeNavigations.HOME]: undefined;
  [homeNavigations.LOGIN]: undefined;
  [homeNavigations.SIGN_UP]: undefined;
  [homeNavigations.FRIEND_LIST]: undefined;
  [homeNavigations.CHAT_ROOM_LIST]: undefined;
  [homeNavigations.CHAT_ROOM]: undefined;
  [homeNavigations.MY_PAGE]: undefined;
};
