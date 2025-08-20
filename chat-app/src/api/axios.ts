import axios from 'axios';
// import dotenv from 'dotenv';
import {API_BASE_URL} from '@env';

const baseURL = API_BASE_URL;

// console.log('[API]', API_BASE_URL); // 찍히면 성공

// dotenv.config(); Windows에서 경로를 못 찾음
// const baseURL: string | undefined = API_BASE_URL;
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

import axios from 'axios';
import {API_BASE_URL} from '@env';
import {useAuthStore} from '../store/useAuthStore'; // zustand 예시

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  config => {
    const {tokens} = useAuthStore.getState(); // zustand에서 현재 토큰 가져오기
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const {tokens, setToken, logout} = useAuthStore.getState();

    // accessToken 만료 → refresh token으로 재발급 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken: tokens?.refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        setToken({
          accessToken: newAccessToken,
          refreshToken: tokens?.refreshToken ?? null,
        });

        // 새 토큰으로 Authorization 헤더 갱신
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${newAccessToken}`;

        // 실패했던 요청 다시 실행
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        logout(); // refresh 실패 → 로그아웃 처리
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
