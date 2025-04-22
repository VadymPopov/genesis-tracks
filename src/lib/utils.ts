import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { TracksQuery } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const VALID_ORDERS = ['asc', 'desc'];

export function buildQueryParams(query: TracksQuery) {
  const queryParams = new URLSearchParams();

  if (query.page) queryParams.append('page', query.page.toString());
  if (query.sort) queryParams.append('sort', query.sort.toString());
  if (query.order && VALID_ORDERS.includes(query.order))
    queryParams.append('order', query.order.toString());
  if (query.search) queryParams.append('search', query.search.toString());
  if (query.artist) queryParams.append('artist', query.artist.toString());
  if (query.genre) queryParams.append('genre', query.genre.toString());
  return queryParams.toString();
}
