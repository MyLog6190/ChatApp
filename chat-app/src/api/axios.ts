import axios from 'axios';
// import dotenv from 'dotenv';
import Config from 'react-native-config';
const baseURL = Config.API_BASE_URL;

// dotenv.config(); Windows에서 경로를 못 찾음
// const baseURL: string | undefined = API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
