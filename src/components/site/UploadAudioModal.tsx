'use client';
import React, { useState } from 'react';

import { FileUp } from 'lucide-react';

import DeleteModal from './DeleteModal';
import UploadTrackForm from './UploadAudioForm';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { stopCurrentAudio } from '@/hooks/useAudioPlayer';
import { useAppContext } from '@/providers';
import { Track } from '@/types';

export default function UploadAudioModal({ track }: { track: Track }) {
  const { deleteAudio } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const onDialogClose = () => {
    setIsOpen(false);
  };

  const onDialogOpen = (open: boolean) => {
    if (open) {
      stopCurrentAudio();
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer"
          data-testid={`upload-track-${track.id}`}
        >
          <FileUp />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {track.audioFile
              ? 'Replace/ Delete a music file (MP3, WAV)'
              : 'Upload a music file (MP3, WAV)'}
          </DialogTitle>
        </DialogHeader>
        {track.audioFile && (
          <div>
            <DialogDescription className="mb-2">
              Do you want to delete current track?!
            </DialogDescription>

            <div className="flex items-center gap-2">
              <audio controls>
                <source
                  src={`http://localhost:8000/api/files/${track.audioFile}?updatedAt=${new Date(track.updatedAt).getTime()}`}
                  type="audio/mp3"
                />
                Your browser does not support the audio element.
              </audio>

              <DeleteModal
                title="Delete Current Audio"
                track={track}
                deleteFn={deleteAudio}
                errorMsg="Failed to delete audio"
                successMsg={`${track.title} audio was successfully deleted!`}
              />
            </div>
          </div>
        )}
        <DialogDescription>
          Pick audio file and click &apos;
          {track.audioFile ? 'Replace' : 'Upload'}&apos;.
        </DialogDescription>
        <UploadTrackForm track={track} onDialogClose={onDialogClose} />
      </DialogContent>
    </Dialog>
  );
}
