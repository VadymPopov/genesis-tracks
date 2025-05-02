import { useState } from 'react';

export const useSelectedTracks = () => {
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);

  const toggleTrackSelection = (trackId: string) => {
    setSelectedTracks((prev) => {
      if (prev.includes(trackId)) {
        return prev.filter((id) => id !== trackId);
      } else {
        return [...prev, trackId];
      }
    });
  };

  const unselectAllTracks = () => {
    setSelectedTracks([]);
  };

  const selectAllTracks = (tracks: string[]) => {
    setSelectedTracks(tracks);
  };

  return {
    selectedTracks,
    toggleTrackSelection,
    unselectAllTracks,
    selectAllTracks,
  };
};
