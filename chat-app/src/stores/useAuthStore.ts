import {create} from 'zustand';
import {Profile} from '../types/doamain';

type ProfileType = Profile;
type Tokens = {accessToken: string | null; refreshToken: string | null};

interface AuthState {
  tokens: Tokens;
  profile: ProfileType;
  setProfile: (profile: ProfileType) => void;
  logout: () => void;
}

// persist 데이터를 앱이 꺼졌다 켜져도 유지
export const useAuthStore = create<AuthState>(set => ({
  tokens: {accessToken: null, refreshToken: null},
  profile: {email: '', name: '', role: '', publicId: ''},

  setProfile: profile => set({profile}),

  setToken: (tokens: Tokens) => set({tokens}),

  logout: () =>
    set({
      tokens: {accessToken: null, refreshToken: null},
      profile: {email: '', name: '', role: '', publicId: ''},
    }),
}));
