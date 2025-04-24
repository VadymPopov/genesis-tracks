'use client';
import React from 'react';

import Loader from './Loader';
import TrackCard from './TrackCard';

import { useTracks } from '@/hooks/useTracks';
import { Meta, Track, TracksQuery } from '@/types';

type TracksListProps = {
  initialData: { data: Track[]; meta: Meta };
  query: TracksQuery;
};

export default function TracksList({ initialData, query }: TracksListProps) {
  const { tracks, isLoading, error } = useTracks({
    fallbackData: initialData,
    query,
  });

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      {isLoading && <Loader />}
      {error && <p className="text-center text-red-500">{error.message}</p>}
      {!isLoading && !error && !tracks?.data.length && (
        <p className="text-center text-2xl text-gray-500">No tracks found.</p>
      )}
      {!isLoading && !error && tracks?.data.length > 0 && (
        <ul className="grid w-full [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))] gap-5">
          {tracks.data.map((track) => (
            <li key={track.id} className="w-full text-black">
              <TrackCard track={track} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
