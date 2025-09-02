import {NavigatorScreenParams} from '@react-navigation/native';

export type AuthStackList = {
  Login: undefined;
  Signup: undefined;
};

export type FriendList = {
  FriendList: undefined;
};

export type ChatStackList = {
  ChatRoomList: undefined;
  ChatRoom: undefined;
};

export type UserStackList = {
  MyPage: undefined;
};

export type AppTabStackList = {
  Friends: NavigatorScreenParams<FriendList>;
  Chat: NavigatorScreenParams<ChatStackList>;
  User: NavigatorScreenParams<UserStackList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppTabStackList {}
  }
}
