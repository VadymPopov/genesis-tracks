'use client';
import React from 'react';

import { Flyout } from './Flyout';
import Loader from './Loader';
import TrackCard from './TrackCard';

import { useAppContext } from '@/providers';

export default function TracksList() {
  const { tracks, isLoading, error, selectedTracks } = useAppContext();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start">
      {isLoading && <Loader testid="loading-tracks" />}
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
      {selectedTracks.length > 0 && <Flyout />}
    </div>
  );
}
