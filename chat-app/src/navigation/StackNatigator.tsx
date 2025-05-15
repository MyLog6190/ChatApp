import {createStackNavigator} from '@react-navigation/stack';
import AuthHomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import {HomeStackParamList} from '../types/stack-param-list';

function AuthStackNavigator() {
  const Stack = createStackNavigator<HomeStackParamList>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* Screen 등록 */}
      <Stack.Screen name="Home" component={AuthHomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

export default AuthStackNavigator;
