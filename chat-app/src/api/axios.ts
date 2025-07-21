import axios from 'axios';
// import dotenv from 'dotenv';
import {API_BASE_URL} from '@env';

const baseURL = API_BASE_URL;

console.log('[API]', API_BASE_URL); // 찍히면 성공

// dotenv.config(); Windows에서 경로를 못 찾음
// const baseURL: string | undefined = API_BASE_URL;
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axiosInstance;
