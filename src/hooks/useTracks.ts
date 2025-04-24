'use client';
import useSWR from 'swr';

export type TracksResponse = {
  data: Track[];
  meta: Meta;
};

import { AxiosError } from 'axios';

import {
  deleteFetcher,
  getFetcher,
  postFetcher,
  putFetcher,
} from '@/lib/axiosFetchers';
import { buildQueryParams } from '@/lib/utils';
import { handleOptimisticMutate } from '@/services/optimisticMutate';
import { Meta, Track, TracksQuery } from '@/types';

export function useTracks({
  fallbackData,
  query,
}: {
  fallbackData?: TracksResponse;
  query?: TracksQuery;
}) {
  const queryParams = buildQueryParams(query);
  const tracksApiUrl = `/api/tracks?${queryParams}`;

  const { data, mutate, error, isLoading } = useSWR<TracksResponse>(
    tracksApiUrl,
    getFetcher,
    {
      fallbackData,
      revalidateIfStale: true,
      revalidateOnMount: false,
    },
  );

  const addTrack = async (track: Omit<Track, 'id' | 'slug' | 'audioFile'>) => {
    try {
      handleOptimisticMutate(mutate, (cachedData) =>
        cachedData
          ? {
              ...cachedData,
              data: [
                ...cachedData.data,
                { ...track, id: 'temp-id', slug: 'temp' },
              ],
            }
          : {
              data: [{ ...track, id: 'temp-id', slug: 'temp' }],
              meta: { limit: 0, page: 0, total: 1, totalPages: 1 },
            },
      );
      await postFetcher('/api/tracks', track);
      mutate();
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;

      console.error(
        'Error adding new track:',
        axiosError?.response?.data?.error,
      );

      const message =
        axiosError?.response?.data?.error || 'An unexpected error occurred.';
      throw new Error(message);
    }
  };

  const editTrack = async (updatedTrack: Track) => {
    try {
      handleOptimisticMutate(mutate, (cachedData) =>
        cachedData
          ? {
              ...cachedData,
              data: cachedData.data.map((t) =>
                t.id === updatedTrack.id ? { ...t, ...updatedTrack } : t,
              ),
            }
          : {
              data: [updatedTrack],
              meta: { limit: 0, page: 0, total: 1, totalPages: 1 },
            },
      );
      await putFetcher(`/api/tracks/${updatedTrack.id}`, updatedTrack);
      mutate((cachedData) => {
        if (!cachedData) return cachedData;
        return {
          ...cachedData,
          data: cachedData.data.map((t) =>
            t.id === updatedTrack.id ? updatedTrack : t,
          ),
        };
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;

      console.error(
        'Error updating a track:',
        axiosError?.response?.data?.error,
      );

      const message =
        axiosError?.response?.data?.error || 'An unexpected error occurred.';
      throw new Error(message);
    }
  };

  const deleteTrack = async (id: string) => {
    const tracksApiUrl = `/api/tracks/${id}`;
    try {
      handleOptimisticMutate(mutate, (cachedData) => ({
        data: cachedData?.data?.filter((track) => track.id !== id) || [],
        meta: cachedData?.meta || {
          limit: 0,
          page: 0,
          total: 1,
          totalPages: 1,
        },
      }));
      await deleteFetcher(tracksApiUrl);
      mutate();
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;

      console.error(
        'Error deleting a track:',
        axiosError?.response?.data?.error,
      );

      const message =
        axiosError?.response?.data?.error || 'An unexpected error occurred.';
      throw new Error(message);
    }
  };

  return {
    tracks: data || {
      data: [],
      meta: { limit: 0, page: 0, total: 0, totalPages: 0 },
    },
    isLoading,
    error,
    addTrack,
    editTrack,
    deleteTrack,
  };
}
