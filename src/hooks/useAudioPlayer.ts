import { useEffect, useRef } from 'react';

let currentlyPlaying: HTMLAudioElement | null = null;

export function useExclusiveAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handlePlay = () => {
      if (currentlyPlaying && currentlyPlaying !== audio) {
        currentlyPlaying.pause();
        currentlyPlaying.currentTime = 0;
      }
      currentlyPlaying = audio;
    };

    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('play', handlePlay);
      if (currentlyPlaying === audio) {
        currentlyPlaying = null;
      }
    };
  }, []);

  return audioRef;
}
