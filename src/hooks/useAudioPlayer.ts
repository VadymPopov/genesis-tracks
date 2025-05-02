import { useEffect, useRef } from 'react';

let currentlyPlaying: HTMLAudioElement | null = null;

export function useAudioPlayer(audioSrc?: number) {
  const audioRef = useRef<HTMLAudioElement>(null);

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
  }, [audioSrc]);

  return audioRef;
}

export function stopCurrentAudio() {
  if (currentlyPlaying) {
    currentlyPlaying.pause();
    currentlyPlaying.currentTime = 0;
    currentlyPlaying = null;
  }
}
