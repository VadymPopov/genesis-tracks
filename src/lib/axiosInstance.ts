import axios from 'axios';

const baseURL =
  typeof window === 'undefined'
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
