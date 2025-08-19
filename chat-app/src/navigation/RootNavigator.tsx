import {createStackNavigator} from '@react-navigation/stack';

function RootNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <></>
    </Stack.Navigator>
  );
}

export default RootNavigator;
