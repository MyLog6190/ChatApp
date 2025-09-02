import {createStackNavigator} from '@react-navigation/stack';
import ChatRoomListScreen from '../screens/chat/ChatRoomListScreen';
import ChatRoomScreen from '../screens/chat/ChatRoomScreen';

export const ChatStack = createStackNavigator({
  screens: {
    ChatRoomList: ChatRoomListScreen,
    ChatRoom: ChatRoomScreen,
  },
});
