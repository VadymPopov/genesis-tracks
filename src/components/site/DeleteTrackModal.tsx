'use client';
import React, { useState } from 'react';

import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useTracks } from '@/hooks/useTracks';
import { Track } from '@/types';

export default function DeleteTrackModal({ track }: { track: Track }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { deleteTrack } = useTracks({});

  const onDialogClose = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTrack(track.id);
      setIsOpen(false);
      toast.success(
        `${track.title} by ${track.artist} was successfully deleted!`,
      );
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to update track',
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Track</DialogTitle>
          <DialogDescription>
            Permanently delete{' '}
            <span className="font-semibold text-black">{track.title}</span> by{' '}
            <span className="font-semibold text-black">{track.artist}</span>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="cursor-pointer"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            <>
              {isDeleting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Deleting
                </>
              ) : (
                'Yes'
              )}
            </>
          </Button>
          <Button
            className="cursor-pointer"
            onClick={onDialogClose}
            disabled={isDeleting}
          >
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
