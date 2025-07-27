import {AxiosResponse} from 'axios';

import {LoginRequest} from '../types/dto/req/auth/login.request';
import {SignupRequest} from '../types/dto/req/auth/signup.request';
import api from './axios';
import {SendEmailRequest} from '../types/dto/req/auth/send-verification-email.dto';
import {VerifyCodeRequest} from '../types/dto/req/auth/verify-code.request';

const BASE_URL = 'auth/v1';

export const login = async (data: LoginRequest): Promise<AxiosResponse> => {
  const response = await api.post(`${BASE_URL}/login`, data);
  return response;
};

export const signup = async (data: SignupRequest): Promise<AxiosResponse> => {
  const response = await api.post(`${BASE_URL}/signup`, data);
  return response;
};

export const verifyCode = async (
  data: VerifyCodeRequest,
): Promise<AxiosResponse> => {
  const response = await api.post(`${BASE_URL}/verify-code`, data);
  return response;
};

export const sendVerificationEmail = async (
  data: SendEmailRequest,
): Promise<AxiosResponse> => {
  const response = await api.post(`${BASE_URL}/send-email`, data);
  return response;
};

export const verifyCode = async (
  data: VerifyCodeRequest,
): Promise<AxiosResponse> => {
  const response = await api.post(`${BASE_URL}/verify-code`, data);
  return response;
};

export const logout = async (path: string) => {};
