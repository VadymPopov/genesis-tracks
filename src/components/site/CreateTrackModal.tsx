'use client';
import React, { useState } from 'react';

import { CirclePlus } from 'lucide-react';

import { CreateTrackForm } from './CreateTrackForm';

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
        <Button variant="outline" className="cursor-pointer">
          <CirclePlus />
          Create Track
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Track</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click submit when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <CreateTrackForm onDialogClose={onDialogClose} />
      </DialogContent>
    </Dialog>
  );
}
