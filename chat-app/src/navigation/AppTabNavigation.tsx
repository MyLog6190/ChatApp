import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FriendListScreen from '../screens/friend/FriendListScreen';
import ChatRoomListScreen from '../screens/chat/ChatRoomListScreen';
import MyPageScreen from '../screens/user/MyPage';
import {createStaticNavigation} from '@react-navigation/native';
import {ChatStack} from './ChatNavigation';

const AppTabStack = createBottomTabNavigator({
  screens: {
    FRIEND: FriendListScreen,
    CHAT: ChatStack,
    OPENCHAT: ChatRoomListScreen,
    MYPAGE: MyPageScreen,
    SETTING: MyPageScreen,
  },
});

const AppTapNavigation = createStaticNavigation(AppTabStack);

export default AppTapNavigation;
