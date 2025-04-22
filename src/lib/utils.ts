import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { TracksQuery } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildQueryParams(query: TracksQuery) {
  const queryParams = new URLSearchParams();
  const validOrders = ['asc', 'desc'];
  if (query.page) queryParams.append('page', query.page.toString());
  if (query.sort) queryParams.append('sort', query.sort.toString());
  if (query.order && validOrders.includes(query.order))
    queryParams.append('order', query.order.toString());
  if (query.search) queryParams.append('search', query.search.toString());
  if (query.artist) queryParams.append('artist', query.artist.toString());

  return queryParams.toString();
}
