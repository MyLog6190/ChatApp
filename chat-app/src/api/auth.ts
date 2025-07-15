import {AxiosResponse} from 'axios';
import {LoginRequest} from '../types/domain/req/login.request';
import {SendEmailRequest} from '../types/domain/req/send-verification-email.dto';
import {SignupRequest} from '../types/domain/req/signup.request';
import api from './axios';

const BASE_URL = 'auth/v1';

export const login = async (data: LoginRequest): Promise<AxiosResponse> => {
  const response = await api.post(`${BASE_URL}/login`, data);
  return response;
};

export const signup = async (data: SignupRequest): Promise<AxiosResponse> => {
  const response = await api.post(`${BASE_URL}/signup`, data);
  return response;
};

export const sendVerificationEmail = async (
  data: SendEmailRequest,
): Promise<AxiosResponse> => {
  console.log(BASE_URL);
  console.log(`${BASE_URL}/send-email`);
  const response = await api.post(`${BASE_URL}/send-email`, data);
  return response;
};

export const logout = async (path: string) => {};
