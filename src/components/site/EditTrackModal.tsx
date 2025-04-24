'use client';
import React, { useState } from 'react';

import { Pencil } from 'lucide-react';

import EditTrackForm from './EditTrackForm';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Track } from '@/types';

export default function EditTrackModal({ track }: { track: Track }) {
  const [isOpen, setIsOpen] = useState(false);
  const onDialogClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Track</DialogTitle>
          <DialogDescription>
            Make changes to the track details and click &apos;Save&apos;.
          </DialogDescription>
        </DialogHeader>
        <EditTrackForm track={track} onDialogClose={onDialogClose} />
      </DialogContent>
    </Dialog>
  );
}
