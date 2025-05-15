import {StackScreenProps} from '@react-navigation/stack';
import {Button, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {homeNavigations} from '../constants/naviations';
import {HomeStackParamList} from '../types/stack-param-list';

type HomeScreenProps = StackScreenProps<HomeStackParamList>;
function HomeScreen({navigation}: HomeScreenProps) {
  return (
    <SafeAreaView>
      <Button
        title="로그인"
        onPress={() => navigation.navigate(homeNavigations.LOGIN)}
      />
      <Button
        title="회원가입"
        onPress={() => navigation.navigate(homeNavigations.SIGN_UP)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default HomeScreen;
