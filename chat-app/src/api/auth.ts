import {LoginRequest} from '../types/domain/req/login.request';
import {SendEmailRequest} from '../types/domain/req/send-verification-email.dto';
import {SignupRequest} from '../types/domain/req/signup.request';
import {ResponseBody} from '../types/domain/res';
import {LoginResponse} from '../types/domain/res/login.response';
import ResponseDto from '../types/domain/res/response.dto';
import api from './axios';

export const login = async (
  data: LoginRequest,
): Promise<ResponseBody<LoginResponse>> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const signup = async (
  data: SignupRequest,
): Promise<ResponseBody<ResponseDto>> => {
  const response = await api.post('/auth/signup', data);
  return response.data;
};

export const sendVerificationEmail = async (
  data: SendEmailRequest,
): Promise<ResponseBody<ResponseDto>> => {
  const response = await api.post('/auth/send/verification-mail', data);
  return response.data;
};

export const logout = async (path: string) => {};
