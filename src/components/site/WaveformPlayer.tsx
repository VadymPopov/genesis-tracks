import React, { useEffect, useRef } from 'react';

import { X } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';

export default function WaveformPlayer({
  audioRef,
  title,
  onClose,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  title: string;
  onClose: () => void;
}) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const waveSurfer = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!waveformRef.current || !audioRef?.current) return;

    const audio = audioRef.current;

    if (waveSurfer.current) {
      waveSurfer.current.destroy();
    }

    waveSurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#e2e8f0',
      progressColor: '#3b82f6',
      barWidth: 2,
      height: 80,
      interact: true,
      media: audio,
    });

    return () => {
      waveSurfer.current?.destroy();
    };
  }, [audioRef]);

  return (
    <div className="relative">
      <p className="mb-2 text-center text-lg font-semibold text-blue-500">
        {title}
      </p>
      <div ref={waveformRef} className="w-full" />
      <button
        className="absolute top-0 right-0 cursor-pointer transition hover:scale-110"
        onClick={onClose}
      >
        <X />
      </button>
    </div>
  );
}
