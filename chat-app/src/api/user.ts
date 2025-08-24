import axiosInstance from './axios';

const BASE_URL = 'user/v1';

export const getProfile = async () => {
  const response = await axiosInstance.get(`${BASE_URL}/profile`);
  return response.data;
};
