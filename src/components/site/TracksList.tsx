'use client';
import React, { useEffect, useState } from 'react';

import { Flyout } from './Flyout';
import Loader from './Loader';
import TrackCard from './TrackCard';
import WaveformPlayer from './WaveformPlayer';

import { useAppContext } from '@/providers';

export default function TracksList() {
  const [showWaveform, setShowWaveform] = useState(false);
  const { tracks, isLoading, error, selectedTracks } = useAppContext();

  const [waveAudioRef, setWaveAudioRef] =
    useState<React.RefObject<HTMLAudioElement | null> | null>(null);
  const [waveTitle, setWaveTitle] = useState<string>('');

  const handleAudioPlay = (
    audioRef: React.RefObject<HTMLAudioElement | null>,
    title: string,
  ) => {
    setWaveAudioRef(audioRef);
    setWaveTitle(title);
    setShowWaveform(true);
  };

  useEffect(() => {
    setShowWaveform(false);
    setWaveAudioRef(null);
    setWaveTitle('');
  }, [tracks?.data]);

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
              <TrackCard track={track} onAudioReady={handleAudioPlay} />
            </li>
          ))}
        </ul>
      )}
      {selectedTracks.length > 0 && <Flyout />}
      {showWaveform && waveAudioRef && (
        <div className="fixed top-0 left-0 z-50 w-full bg-gray-50 p-4 shadow-lg transition-all duration-300">
          <WaveformPlayer
            audioRef={waveAudioRef}
            title={waveTitle}
            onClose={() => setShowWaveform(false)}
          />
        </div>
      )}
    </div>
  );
}
