import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const baseURL: string | undefined = process.env.API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
