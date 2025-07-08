import {AxiosResponse} from 'axios';
import {LoginRequest} from '../types/domain/req/login.request';
import {SendEmailRequest} from '../types/domain/req/send-verification-email.dto';
import {SignupRequest} from '../types/domain/req/signup.request';
import api from './axios';

export const login = async (data: LoginRequest): Promise<AxiosResponse> => {
  const response = await api.post('/auth/login', data);
  return response;
};

export const signup = async (data: SignupRequest): Promise<AxiosResponse> => {
  const response = await api.post('/auth/signup', data);
  return response;
};

export const sendVerificationEmail = async (
  data: SendEmailRequest,
): Promise<AxiosResponse> => {
  const response = await api.post('/auth/send/verification-mail', data);
  return response.data;
};

export const logout = async (path: string) => {};
