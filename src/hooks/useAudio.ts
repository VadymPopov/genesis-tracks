'use client';
import { useSWRConfig } from 'swr';

import { deleteFetcher, postFetcher } from '@/lib/axiosFetchers';
import { buildQueryParams, getAxiosErrorMessage } from '@/lib/utils';
import { TracksQuery } from '@/types';

export function useAudio(query: TracksQuery) {
  const { mutate } = useSWRConfig();
  const queryParams = buildQueryParams(query);
  const tracksApiUrl = query ? `/api/tracks?${queryParams}` : null;

  const deleteAudio = async (id: string) => {
    const audioApiUrl = `/api/tracks/${id}/file`;
    try {
      await deleteFetcher(audioApiUrl);
      console.log('Mutating:', tracksApiUrl);
      mutate(tracksApiUrl);
    } catch (error) {
      console.error('Error deleting audio:', getAxiosErrorMessage(error));
      throw new Error(getAxiosErrorMessage(error));
    }
  };

  const uploadAudio = async ({
    file,
    id,
    hasExistingAudio,
  }: {
    file: FormData;
    id: string;
    hasExistingAudio: boolean;
  }) => {
    const audioApiUrl = `/api/tracks/${id}/upload`;
    try {
      if (hasExistingAudio) {
        await deleteAudio(id);
      }
      await postFetcher(audioApiUrl, file);
      console.log('Mutating:', tracksApiUrl);
      mutate(tracksApiUrl);
    } catch (error) {
      console.error('Error adding audio:', getAxiosErrorMessage(error));
      throw new Error(getAxiosErrorMessage(error));
    }
  };

  return {
    uploadAudio,
    deleteAudio,
  };
}
