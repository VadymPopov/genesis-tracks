'use client';

import { createContext, useContext, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import { useAudio } from '@/hooks/useAudio';
import { useGenres } from '@/hooks/useGenres';
import { TracksResponse, useTracks } from '@/hooks/useTracks';
import { Track } from '@/types';

type AppContextType = {
  tracks: TracksResponse;
  isLoading: boolean;
  error: Error | null;
  addTrack: (track: Omit<Track, 'id' | 'slug' | 'audioFile'>) => Promise<void>;
  editTrack: (track: Track) => Promise<void>;
  deleteTrack: (trackId: string) => Promise<void>;
  genres: string[];
  genreList: { value: string; label: string }[];
  isGenresLoading: boolean;
  genresError: Error | null;
  deleteAudio: (trackId: string) => Promise<void>;
  uploadAudio: ({
    file,
    id,
    hasExistingAudio,
  }: {
    file: FormData;
    id: string;
    hasExistingAudio: boolean;
  }) => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({
  children,
  fallbackData,
}: {
  children: React.ReactNode;
  fallbackData: TracksResponse;
}) {
  const params = useSearchParams();
  const queryParams = Object.fromEntries(params.entries());
  const query = { ...queryParams, page: queryParams.page || '1' };

  const { tracks, isLoading, error, addTrack, editTrack, deleteTrack } =
    useTracks({ fallbackData, query });

  const {
    genres,
    error: genresError,
    isLoading: isGenresLoading,
  } = useGenres();

  const genreList = useMemo(
    () => genres.map((genre) => ({ value: genre, label: genre })),
    [genres],
  );

  const { deleteAudio, uploadAudio } = useAudio(query);

  const value = useMemo<AppContextType>(
    () => ({
      tracks,
      isLoading,
      error,
      addTrack,
      editTrack,
      deleteTrack,
      genres,
      genresError,
      isGenresLoading,
      deleteAudio,
      uploadAudio,
      genreList,
    }),
    [
      tracks,
      isLoading,
      error,
      addTrack,
      editTrack,
      deleteTrack,
      genres,
      genresError,
      isGenresLoading,
      deleteAudio,
      uploadAudio,
      genreList,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be inside AppProvider');
  return ctx;
}
