import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigation from './AuthNavigation';
import AppTapNavigation from './AppTabNavigation';
import {useAuth} from '../hooks/queries/useAuth';

function RootNavigation() {
  const {isLogin} = useAuth();
  console.log(isLogin);
  return isLogin ? <AppTapNavigation /> : <AuthNavigation />;
}

export default RootNavigation;
