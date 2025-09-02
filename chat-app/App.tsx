import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import queryClient from './src/api/quert-client';
import RootNavigation from './src/navigation/RootNavigation';

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
    </QueryClientProvider>
  );
}

export default App;
