'use client';
import React from 'react';

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

  console.log(tracks);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {tracks?.data.map((track) => (
        <li key={track.id} className="text-black">
          <TrackCard track={track} />
        </li>
      ))}
    </ul>
  );
}
