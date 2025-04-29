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
  const { id, title, artist, audioFile, updatedAt } = track;
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
        <Button className="cursor-pointer" data-testid={`upload-track-${id}`}>
          <FileUp />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {audioFile
              ? 'Replace/ Delete a music file (MP3, WAV)'
              : 'Upload a music file (MP3, WAV)'}
          </DialogTitle>
        </DialogHeader>
        {audioFile && (
          <div>
            <DialogDescription className="mb-2">
              Do you want to delete current track?!
            </DialogDescription>

            <div className="flex items-center gap-2">
              <audio controls>
                <source
                  src={`${process.env.NEXT_PUBLIC_API_URL}/api/files/${audioFile}?updatedAt=${new Date(updatedAt!).getTime()}`}
                  type="audio/mp3"
                />
                Your browser does not support the audio element.
              </audio>

              <DeleteModal
                title="Delete Current Audio"
                description={`Permanently delete audio track "${title}" by ${artist}?`}
                deleteFn={() => deleteAudio(id)}
                errorMsg="Failed to delete audio"
                successMsg={`${title} audio was successfully deleted!`}
              />
            </div>
          </div>
        )}
        <DialogDescription>
          Pick audio file and click &apos;
          {audioFile ? 'Replace' : 'Upload'}&apos;.
        </DialogDescription>
        <UploadTrackForm track={track} onDialogClose={onDialogClose} />
      </DialogContent>
    </Dialog>
  );
}
