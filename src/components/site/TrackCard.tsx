import React from 'react';
import Image from 'next/image';

import { FileUp, Pencil, Trash2 } from 'lucide-react';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Track } from '@/types';

export default function TrackCard({ track }: { track: Track }) {
  return (
    <Card className="relative flex h-full flex-col justify-between overflow-hidden pt-0 transition-colors hover:cursor-pointer hover:shadow-2xl">
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
        <CardTitle className="mb-2 text-lg font-semibold">
          {track.title}
        </CardTitle>
        <CardDescription>{track.artist}</CardDescription>
        <CardDescription>
          Album: <span className="text-black">{track.album ?? 'N/A'}</span>
        </CardDescription>
      </CardContent>
      <CardFooter className="flex gap-4">
        <audio controls>
          <source src={track.audioFile} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>
                <Pencil />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit a track</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button>
                <FileUp />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Upload an audio</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button>
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete a track</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
