'use client';
import useSWR from 'swr';

export type GenresResponse = string[];

import { getFetcher } from '@/lib/axiosFetchers';

export function useGenres() {
  const genresApiUrl = '/api/genres';

  const { data, error, isLoading } = useSWR<GenresResponse>(
    genresApiUrl,
    getFetcher,
    {
      revalidateIfStale: true,
      revalidateOnMount: true,
    },
  );

  return {
    genres: data || [],
    isLoading,
    error,
  };
}
