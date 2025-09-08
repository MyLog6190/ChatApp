import {AxiosResponse} from 'axios';

import {LoginRequest} from '../types/dto/req/auth/login.request';
import {SendEmailRequest} from '../types/dto/req/auth/send-verification-email.dto';
import {SignupRequest} from '../types/dto/req/auth/signup.request';
import {VerifyCodeRequest} from '../types/dto/req/auth/verify-code.request';
import {ResponseBody} from '../types/dto/res';
import {LoginResponse} from '../types/dto/res/login.response';
import {getEncryptedStorage} from '../utils/encrypt-storage';
import axiosInstance from './axios';

const BASE_URL = 'auth/v1';

export const sendVerificationEmail = async (
  requestBody: SendEmailRequest,
): Promise<AxiosResponse> => {
  const {data} = await axiosInstance.post(
    `${BASE_URL}/send-email`,
    requestBody,
  );

  return data;
};

export const verifyCode = async (
  requestBody: VerifyCodeRequest,
): Promise<AxiosResponse> => {
  const {data} = await axiosInstance.post(
    `${BASE_URL}/verify-code`,
    requestBody,
  );
  return data;
};

export const signup = async (
  requestBody: SignupRequest,
): Promise<AxiosResponse> => {
  const {data} = await axiosInstance.post(`${BASE_URL}/signup`, requestBody);
  return data;
};

export const login = async (
  requestBody: LoginRequest,
): Promise<ResponseBody<LoginResponse>> => {
  const {data} = await axiosInstance.post(`${BASE_URL}/login`, requestBody);
  return data;
};

export const logout = async () => {
  await axiosInstance.post(`${BASE_URL}/logout`);
};

export const getProfile = async () => {
  const {data} = await axiosInstance.get(`${BASE_URL}/profile`);
  return data;
};

// api/auth.ts
export const getAccessToken = async () => {
  const refreshToken = await getEncryptedStorage('refreshToken');

  console.log(refreshToken);
  if (!refreshToken) {
    throw new Error('NO_REFRESH_TOKEN'); // ← 반드시 throw 해서 undefined 방지
  }

  // ❌ 지금 코드는 headers를 body로 보내고 있음
  // const response = await axiosInstance.post(`${BASE_URL}/refresh`, {
  //   headers: { Authorization: `Bearer ${refreshToken}` },
  // });

  // ✅ POST의 3번째 인자에 headers
  const {data} = await axiosInstance.post(`${BASE_URL}/refresh`, null, {
    headers: {Authorization: `Bearer ${refreshToken}`},
  });

  // 서버가 ApiResponse<{accessToken, refreshToken?}> 형태라면
  const payload = data?.data ?? data; // 너의 ApiResponse.success(...) 구조에 맞춰 꺼냄
  const accessToken = payload?.accessToken ?? payload?.token ?? payload;

  if (!accessToken) {
    throw new Error('NO_ACCESS_TOKEN_IN_RESPONSE'); // undefined 반환 방지
  }

  return accessToken; // ← 문자열 반환(또는 필요하면 payload 전체 반환, 그럼 아래 select 맞춰)
};
