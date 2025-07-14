import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {queryClient} from './src/api/quertClient';
import AuthStackNavigator from './src/navigation/StackNatigator';
import {useAuthStore} from './src/stores/useAuthStore';

function App(): React.JSX.Element {
  const loadToken = async () => {
    const token = await EncryptedStorage.getItem('token');
    if (token) useAuthStore.getState().setToken(token);
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {/* Navigation 등록 */}
        <AuthStackNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
