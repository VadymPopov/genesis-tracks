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
import { buildQueryParams, getAxiosErrorMessage } from '@/lib/utils';
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
  const tracksApiUrl = query ? `/api/tracks?${queryParams}` : null;

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
      console.error('Error adding track:', getAxiosErrorMessage(error));
      throw new Error(getAxiosErrorMessage(error));
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
      console.error('Error updating track:', getAxiosErrorMessage(error));
      throw new Error(getAxiosErrorMessage(error));
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
      mutate((cachedData) => ({
        data: cachedData?.data?.filter((track) => track.id !== id) || [],
        meta: cachedData?.meta || {
          limit: 0,
          page: 0,
          total: 1,
          totalPages: 1,
        },
      }));
    } catch (error) {
      console.error('Error deleting track:', getAxiosErrorMessage(error));
      throw new Error(getAxiosErrorMessage(error));
    }
  };

  const deleteSelectedTracks = async (ids: string[]) => {
    const tracksApiUrl = '/api/tracks/delete';
    try {
      handleOptimisticMutate(mutate, (cachedData) => {
        if (!cachedData) {
          return undefined;
        }

        if (!cachedData.data) {
          return cachedData;
        }

        const updatedData = cachedData.data.filter(
          (track) => !ids.some((id) => track.id === id),
        );
        let updatedMeta = cachedData.meta;

        if (cachedData.meta) {
          updatedMeta = {
            ...cachedData.meta,
            total:
              cachedData.meta.total > ids.length
                ? cachedData.meta.total - ids.length
                : 0,
            totalPages:
              cachedData.meta.total > ids.length
                ? Math.ceil(
                    (cachedData.meta.total - ids.length) /
                      cachedData.meta.limit,
                  )
                : 0,
          };
        }

        return {
          ...cachedData,
          data: updatedData,
          meta: updatedMeta,
        };
      });

      await postFetcher(tracksApiUrl, { ids });
      mutate();
    } catch (error) {
      console.error(
        'Error deleting selected tracks:',
        getAxiosErrorMessage(error),
      );
      throw new Error(getAxiosErrorMessage(error));
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
    deleteSelectedTracks,
  };
}
