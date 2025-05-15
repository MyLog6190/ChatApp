앱 구성

```
src/
├── api/ # axios 기반 API 요청
├── components/ # 공통 UI 컴포넌트
├── hooks/ # 커스텀 훅
├── navigation/ # 화면 라우팅
├── screens/ # 각 화면 컴포넌트
├── sockets/ # STOMP 연결/구독 처리
├── stores/ # zustand 상태 관리
├── types/ # 전역 타입 정의 (User, Message 등)
├── utils/ # 날짜 포맷, 공통 함수
└── assets/ # 이미지, 영상, 폰트 등
```

module

React Navigation

- 설치

  - npm install @react-navigation/native

- 종속성 추가

  - npm install react-native-screens react-native-safe-area-context

    ```kotlin
    import android.os.Bundle

    class MainActivity: ReactActivity() {
        // ...
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(null)
        }
        // ...
    }
    ```

- Stack Navigator

  - npm install @react-navigation/stack
  - npm install react-native-gesture-handler
  - npm install @react-native-masked-view/masked-view

React Native Encrypted Storge

- npm i react-native-encrypted-storage

React Query

- npm install @tanstack/react-query
- QueryClient 셋업 (App.tsx)

```
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import AuthStackNavigator from './src/navigation/StackNatigator';

const queryClient = new QueryClient();

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

```
