import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {queryClient} from './src/api/quertClient';
import AuthStackNavigator from './src/navigation/StackNatigator';

function App(): React.JSX.Element {
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
