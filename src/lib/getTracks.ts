import { getFetcher } from './axiosFetchers';
import { buildQueryParams } from './utils';

import { TracksResponse } from '@/hooks/useTracks';
import { TracksQuery } from '@/types';

export async function getTracks(query: TracksQuery) {
  const params = buildQueryParams(query);
  return await getFetcher<TracksResponse>(`api/tracks?${params}`);
}
