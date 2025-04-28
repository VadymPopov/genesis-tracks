'use client';
import React, { useState } from 'react';

import { CirclePlus } from 'lucide-react';

import CreateTrackForm from './CreateTrackForm';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function CreateTrackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const onDialogClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer"
          data-testid="create-track-button"
        >
          <CirclePlus />
          Create Track
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Track</DialogTitle>
          <DialogDescription>
            Enter your favorite track&apos;s details below, then click
            &apos;Submit&apos;.
          </DialogDescription>
        </DialogHeader>
        <CreateTrackForm onDialogClose={onDialogClose} />
      </DialogContent>
    </Dialog>
  );
}
