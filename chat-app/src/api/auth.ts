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
): Promise<ResponseBody<null>> => {
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

const getProfile = async () => {
  const {data} = await axiosInstance.get(`${BASE_URL}/profile`);
  return data;
};

const getAccessToken = async () => {
  const refreshToken = getEncryptedStorage('refreshToken');

  const response = await axiosInstance.get(`${BASE_URL}/refresh`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
};
