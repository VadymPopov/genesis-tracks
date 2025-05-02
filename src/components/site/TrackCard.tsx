import React, { useMemo } from 'react';
import Image from 'next/image';

import clsx from 'clsx';

import { Badge } from '../ui/badge';
import DeleteModal from './DeleteModal';
import EditTrackModal from './EditTrackModal';
import UploadTrackModal from './UploadAudioModal';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useAppContext } from '@/providers';
import { Track } from '@/types';

export default function TrackCard({
  track,
  onAudioReady,
}: {
  track: Track;
  onAudioReady: (
    audioRef: React.RefObject<HTMLAudioElement | null>,
    title: string,
  ) => void;
}) {
  const genres = useMemo(() => track.genres, [track.genres]);

  const { id, title, artist, album, coverImage, audioFile, updatedAt } = track;

  const audioRef = useAudioPlayer(new Date(updatedAt!).getTime());
  const { deleteTrack, selectedTracks, toggleTrackSelection } = useAppContext();

  const audioUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/files/${audioFile}?updatedAt=${new Date(updatedAt!).getTime()}`;

  return (
    <Card
      className={clsx(
        'relative flex h-full flex-col justify-between overflow-hidden pt-0 transition-colors hover:cursor-pointer hover:shadow-2xl',
        selectedTracks.includes(id)
          ? 'border-2 border-blue-400'
          : 'border-2 border-transparent',
      )}
      data-testid={`track-item-${id}`}
      onClick={() => toggleTrackSelection(id)}
    >
      <div className="absolute top-5 right-5 flex gap-2">
        {genres.map((genre: string) => (
          <Badge key={genre} variant="secondary">
            {genre}
          </Badge>
        ))}
      </div>

      <CardHeader className="gap-0 p-0">
        <Image
          src={coverImage ?? '/placeholder.jpg'}
          alt={title}
          width={400}
          height={300}
          className="max-h-[300px] w-full object-cover"
        />
      </CardHeader>
      <CardContent className="mt-4">
        <CardTitle
          className="mb-2 text-lg font-semibold"
          data-testid={`track-item-${id}-title`}
        >
          {title}
        </CardTitle>
        <CardDescription data-testid={`track-item-${id}-artist`}>
          {artist}
        </CardDescription>
        <CardDescription>
          Album: <span className="text-black">{album ?? 'N/A'}</span>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {audioFile && (
          <audio
            controls
            className="w-full"
            ref={audioRef}
            data-testid={`audio-player-${id}`}
            onPlay={() => onAudioReady(audioRef, title)}
          >
            <source src={audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        )}
        <div
          className="flex gap-2 self-end"
          onClick={(e) => e.stopPropagation()}
        >
          <EditTrackModal track={track} />
          <UploadTrackModal track={track} />
          <DeleteModal
            title="Delete track"
            description={`Permanently delete track "${title}" by ${artist}?`}
            deleteFn={() => deleteTrack(id)}
            successMsg={`${title} deleted successfully!`}
            buttonTestId={`delete-track-${id}`}
            errorMsg="Failed to delete track"
          />
        </div>
      </CardFooter>
    </Card>
  );
}
