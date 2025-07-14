import {AxiosResponse} from 'axios';
import {LoginRequest} from '../types/domain/req/login.request';
import {SendEmailRequest} from '../types/domain/req/send-verification-email.dto';
import {SignupRequest} from '../types/domain/req/signup.request';
import api from './axios';

export const login = async (data: LoginRequest): Promise<AxiosResponse> => {
  const response = await api.post('/auth/v1/login', data);
  return response;
};

export const signup = async (data: SignupRequest): Promise<AxiosResponse> => {
  const response = await api.post('/auth/v1/signup', data);
  return response;
};

export const sendVerificationEmail = async (
  data: SendEmailRequest,
): Promise<AxiosResponse> => {
  const response = await api.post('/auth/v1/send/verification-email', data);
  return response;
};

export const logout = async (path: string) => {};
