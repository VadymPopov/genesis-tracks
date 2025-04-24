'use client';
import useSWR from 'swr';

export type TracksResponse = {
  data: Track[];
  meta: Meta;
};

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
      console.error('Error adding new track:', error?.response?.data?.error);
      const message =
        error?.response?.data?.error || 'An unexpected error occurred.';
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
  };
}
