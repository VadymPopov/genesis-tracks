import React from 'react';

import TrackCard from './TrackCard';

export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  genres: string[];
  slug: string;
  coverImage: string;
  audioFile: string;
};

type TracksListProps = {
  tracks: Track[];
};

export default function TracksList({ tracks }: TracksListProps) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {tracks.map((track) => (
        <li key={track.id} className="text-black">
          <TrackCard track={track} />
        </li>
      ))}
    </ul>
  );
}
