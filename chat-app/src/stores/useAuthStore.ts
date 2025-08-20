// authStore.ts
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

// 필요 시 프로젝트 공용 유틸로 대체
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  getEncryptedStorage,
  removeEncryptedStorage,
  setEncryptedStorage,
} from '../utils/encrypt-storage';

type Tokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

interface AuthState {
  tokens: Tokens;
  setTokens: (data: Tokens) => void; // 부분 업데이트 허용
  clear: () => void;
}

const encryptedStorage = {
  getItem: async (key: string) => (await getEncryptedStorage(key)) ?? null,
  setItem: async (key: string, value: string) => {
    await setEncryptedStorage(key, value);
  },
  removeItem: async (key: string) => {
    await removeEncryptedStorage(key);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      tokens: {accessToken: null, refreshToken: null},
      setTokens: (tokens: Tokens) => set({tokens}),
      clear: () => set({tokens: {accessToken: null, refreshToken: null}}),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => encryptedStorage),
      partialize: s => ({}),
    },
  ),
);

// 리액트 바깥(axios 인터셉터 등)에서 읽을 때
export const authGetState = () => useAuthStore.getState();
