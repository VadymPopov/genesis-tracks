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
import { Meta, Track, TracksQuery } from '@/types';

export function useTracks({
  fallbackData,
  query,
}: {
  fallbackData?: TracksResponse;
  query: TracksQuery;
}) {
  const queryParams = buildQueryParams(query);
  const tracksApiUrl = `/api/tracks?${queryParams}`;

  const { data, error, isLoading } = useSWR<TracksResponse>(
    tracksApiUrl,
    getFetcher,
    {
      fallbackData,
      revalidateIfStale: true,
      revalidateOnMount: false,
    },
  );

  return {
    tracks: data || {
      data: [],
      meta: { limit: 0, page: 0, total: 0, totalPages: 0 },
    },
    isLoading,
    error,
  };
}
