import {LoginRequest} from '../types/domain/req/login.request';
import {SignupRequest} from '../types/domain/req/signup.request';
import {ResponseBody} from '../types/domain/res';
import {LoginResponse} from '../types/domain/res/login.response';
import ResponseDto from '../types/domain/res/response.dto';
import api from './axios';

export const login = async (
  path: string,
  data: LoginRequest,
): Promise<ResponseBody<LoginResponse>> => {
  const response = await api.post(path, data);
  return response.data;
};

export const signup = async (
  path: string,
  data: SignupRequest,
): Promise<ResponseBody<ResponseDto>> => {
  const response = await api.post(path, data);
  return response.data;
};

export const sendVerificationEmail = (path: string, data: any) => {};
