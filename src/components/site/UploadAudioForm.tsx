'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/providers';
import { Track } from '@/types';

export const formSchema = z.object({
  audioFile: z
    .instanceof(File, { message: 'Audio file is required.' })
    .refine(
      (file) =>
        file.type === 'audio/mpeg' ||
        file.type === 'audio/wav' ||
        file.type === 'audio/mp3' ||
        file.type === 'audio/x-wav',
      {
        message: 'File must be an MP3 or WAV file.',
      },
    )
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: 'File size must be less than 10MB.',
    }),
});

export default function UploadAudioForm({
  track,
  onDialogClose,
}: {
  track: Track;
  onDialogClose: () => void;
}) {
  const { uploadAudio } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('audioFile', values.audioFile);

    setIsSubmitting(true);

    try {
      await uploadAudio({
        file: formData,
        id: track.id,
        hasExistingAudio: !!track.audioFile,
      });
      form.reset();
      onDialogClose();
      toast.success(
        `${track.title} by ${track.artist} ${!!track.audioFile ? 'replaced' : 'uploaded'} successfully!`,
      );
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to upload audio file',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="audioFile"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel>Audio File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="audio/mpeg,audio/wav,audio/mp3,audio/x-wav"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
        >
          <>
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                {track.audioFile ? 'Replacing...' : 'Uploading...'}
              </>
            ) : track.audioFile ? (
              'Replace'
            ) : (
              'Upload'
            )}
          </>
        </Button>
      </form>
    </Form>
  );
}
