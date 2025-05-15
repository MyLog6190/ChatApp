import axios, {Method} from 'axios';
import {RequestBody} from '../types/domain/request';
import dotenv from 'dotenv';

dotenv.config();

const baseURL: string | undefined = process.env.API_BASE_URL;

// Axios 인스턴스를 생성하는 함수
const axiosInstance = async () => {
  return axios.create({
    baseURL,
    withCredentials: true,
  });
};

// // 요청 함수
// const axiosInstance = async <RequestType, ResponseType>(
//   method: Method,
//   path: string,
//   data?: RequestBody<RequestType> | null,
// ): Promise<ResponseBody<ResponseType>> => {
//   const instance = await createAxios(); //  인스턴스 생성

//   const response = await instance.request<ResponseBody<ResponseType>>({
//     method,
//     url: path,
//     ...(method === 'GET' ? {params: data} : {data}),
//   });
//   return response.data;
// };

export default axiosInstance;
