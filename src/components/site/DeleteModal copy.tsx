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

type DeleteModalProps = {
  title: string;
  description: string;
  deleteFn: () => Promise<void>;
  successMsg: string;
  errorMsg: string;
  buttonTestId?: string;
  buttonText?: string;
};

export default function DeleteModal({
  title,
  description,
  deleteFn,
  successMsg,
  errorMsg,
  buttonTestId,
  buttonText,
}: DeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onDialogClose = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteFn();
      setIsOpen(false);
      toast.success(successMsg);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : errorMsg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" data-testid={buttonTestId}>
          {buttonText}
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="cursor-pointer"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? (
              <>
                <Loader2 className="animate-spin" />
                Deleting
              </>
            ) : (
              'Yes'
            )}
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
