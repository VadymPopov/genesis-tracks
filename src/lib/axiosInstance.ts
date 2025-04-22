import toast from 'react-hot-toast';

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          toast.error('Unauthorized. Please log in.');
          break;
        case 403:
          toast.error('Forbidden. You do not have access.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(error.response.data?.message || 'An error occurred.');
      }
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error('An unexpected error occurred.');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
