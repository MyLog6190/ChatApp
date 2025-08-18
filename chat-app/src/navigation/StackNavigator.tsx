import {createStackNavigator} from '@react-navigation/stack';

function StackNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <></>
    </Stack.Navigator>
  );
}

export default StackNavigator;
