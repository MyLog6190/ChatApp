import {Method} from 'axios';
import {LoginRequest} from '../types/domain/request/login.request';
import axiosInstance from './axios';

export const login = async (
  method: Method,
  path: string,
  data: LoginRequest,
) => {
  const axios = await axiosInstance();

  const response = await axios.request({
    method,
    url: path,
    ...(method === 'GET' ? {params: data} : {data}),
  });

  return response.data;
};
