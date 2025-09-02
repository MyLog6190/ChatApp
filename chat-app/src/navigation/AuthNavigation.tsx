import {createStaticNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

const AuthStack = createStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Login: LoginScreen,
    Signup: SignupScreen,
  },
});

const AuthNavigation = createStaticNavigation(AuthStack);

export default AuthNavigation;
