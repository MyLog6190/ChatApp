import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import FriendListScreen from '../screens/FriendListScreen';
import ChatRoomListScreen from '../screens/ChatRoomListScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import MyPageScreen from '../screens/MyPage';
import HomeScreen from '../screens/HomeScreen';
import {HomeStackParamList} from './type';

function AuthStackNavigator() {
  const Stack = createStackNavigator<HomeStackParamList>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* Screen 등록 */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="FriendList" component={FriendListScreen} />
      <Stack.Screen name="ChatRoomList" component={ChatRoomListScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
      <Stack.Screen name="MyPage" component={MyPageScreen} />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
