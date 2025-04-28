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
import { Track } from '@/types';

type DeleteModalProps = {
  isTrack?: boolean;
  title: string;
  track: Track;
  deleteFn: (id: string) => Promise<void>;
  successMsg?: string;
  errorMsg?: string;
};

export default function DeleteModal({
  isTrack,
  title,
  track,
  deleteFn,
  successMsg,
  errorMsg,
}: DeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onDialogClose = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteFn(track.id);
      setIsOpen(false);
      toast.success(successMsg || `${track.title} was successfully deleted!`);
    } catch (error) {
      console.log(error);
      toast.error(error instanceof Error ? error.message : errorMsg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer"
          data-testid={isTrack ? `delete-track-${track.id}` : ''}
        >
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
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
