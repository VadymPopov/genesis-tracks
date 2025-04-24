'use client';
import { AxiosError } from 'axios';

import { deleteFetcher, postFetcher } from '@/lib/axiosFetchers';

export function useAudio() {
  const uploadAudio = async (file: FormData, id: string) => {
    const audioApiUrl = `/api/tracks/${id}/upload`;
    try {
      await postFetcher(audioApiUrl, file);
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      const message =
        axiosError?.response?.data?.error || 'An unexpected error occurred.';
      throw new Error(message);
    }
  };

  const deleteAudio = async (id: string) => {
    const audioApiUrl = `/api/tracks/${id}/file`;
    try {
      await deleteFetcher(audioApiUrl);
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      const message =
        axiosError?.response?.data?.error || 'An unexpected error occurred.';
      throw new Error(message);
    }
  };

  return {
    uploadAudio,
    deleteAudio,
  };
}
