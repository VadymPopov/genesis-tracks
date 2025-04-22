import axiosInstance from './axiosInstance';

export const getFetcher = async <T>(url: string): Promise<T> => {
  const { data } = await axiosInstance.get<T>(url);
  return data;
};

export const postFetcher = async <T, D = unknown>(
  url: string,
  body: D,
): Promise<T> => {
  const { data } = await axiosInstance.post<T>(url, body);
  return data;
};

export const putFetcher = async <T, D = unknown>(
  url: string,
  body: D,
): Promise<T> => {
  const { data } = await axiosInstance.put<T>(url, body);
  return data;
};

export const patchFetcher = async <T, D = unknown>(
  url: string,
  body: D,
): Promise<T> => {
  const { data } = await axiosInstance.patch<T>(url, body);
  return data;
};

export const deleteFetcher = async <T>(url: string): Promise<T> => {
  const { data } = await axiosInstance.delete<T>(url);
  return data;
};
