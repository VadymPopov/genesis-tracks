import React from 'react';
import Image from 'next/image';

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
import { useExclusiveAudio } from '@/hooks/useAudioPlayer';
import { useAppContext } from '@/providers';
import { Track } from '@/types';

export default function TrackCard({ track }: { track: Track }) {
  const audioRef = useExclusiveAudio(new Date(track.updatedAt).getTime());
  const { deleteTrack } = useAppContext();
  return (
    <Card
      className="relative flex h-full flex-col justify-between overflow-hidden pt-0 transition-colors hover:cursor-pointer hover:shadow-2xl"
      data-testid={`track-item-${track.id}`}
    >
      <div className="absolute top-5 right-5 flex gap-2">
        {track.genres.map((genre: string) => (
          <Badge key={genre} variant="secondary">
            {genre}
          </Badge>
        ))}
      </div>

      <CardHeader className="gap-0 p-0">
        <Image
          src={track.coverImage ?? '/placeholder.jpg'}
          alt={track.title}
          width={400}
          height={300}
          className="max-h-[300px] w-full object-cover"
        />
      </CardHeader>
      <CardContent className="mt-4">
        <CardTitle
          className="mb-2 text-lg font-semibold"
          data-testid={`track-item-${track.id}-title`}
        >
          {track.title}
        </CardTitle>
        <CardDescription data-testid={`track-item-${track.id}-artist`}>
          {track.artist}
        </CardDescription>
        <CardDescription>
          Album: <span className="text-black">{track.album ?? 'N/A'}</span>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {track.audioFile && (
          <audio
            controls
            className="w-full"
            ref={audioRef}
            data-testid={`audio-player-${track.id}`}
          >
            <source
              src={`http://localhost:8000/api/files/${track.audioFile}?updatedAt=${new Date(track.updatedAt).getTime()}`}
              type="audio/mp3"
            />
            Your browser does not support the audio element.
          </audio>
        )}
        <div className="flex gap-2 self-end">
          <EditTrackModal track={track} />
          <UploadTrackModal track={track} />
          <DeleteModal
            title="Delete Track"
            track={track}
            deleteFn={deleteTrack}
            errorMsg="Failed to delete track"
            successMsg={`${track.title} by ${track.artist} was successfully deleted!`}
            isTrack={true}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
