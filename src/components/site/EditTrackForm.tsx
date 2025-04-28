'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import { MultiSelect } from '../ui/multi-select';

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
  title: z
    .string()
    .trim()
    .min(2, 'Title must be at least 2 characters')
    .max(50, 'Title must be at most 50 characters'),
  artist: z
    .string()
    .trim()
    .min(2, 'Artist must be at least 2 characters')
    .max(50, 'Artist must be at most 50 characters'),
  album: z
    .string()
    .trim()
    .min(2, 'Album must be at least 2 characters')
    .max(50, 'Album must be at most 50 characters')
    .optional()
    .or(z.literal('')),
  genres: z
    .array(z.string().min(1, 'Genre cannot be empty'))
    .min(1, 'At least one genre is required')
    .max(5, 'You can select up to 5 genres'),
  coverImage: z
    .string()
    .url('Cover image must be a valid URL')
    .optional()
    .or(z.literal('')),
});

export default function EditTrackForm({
  track,
  onDialogClose,
}: {
  track: Track;
  onDialogClose: () => void;
}) {
  const { editTrack, genreList } = useAppContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: track.title,
      artist: track.artist,
      album: track.album,
      genres: track.genres,
      coverImage: track.coverImage,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedTrack = {
      ...values,
      coverImage:
        values.coverImage || 'https://www.picsum.photos/id/237/200/300',
    };
    setIsSubmitting(true);

    try {
      await editTrack({ ...track, ...updatedTrack });
      form.reset();
      onDialogClose();
      toast.success(
        `${updatedTrack.title} by ${updatedTrack.artist} updated successfully!`,
      );
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to update track',
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter the title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="artist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artist</FormLabel>
              <FormControl>
                <Input placeholder="Enter the artist name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="album"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Album</FormLabel>
              <FormControl>
                <Input placeholder="Enter the album name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genres"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genres</FormLabel>
              <FormControl>
                <MultiSelect
                  options={genreList}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Select genres"
                  variant="inverted"
                  maxCount={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image Link</FormLabel>
              <FormControl>
                <Input placeholder="Enter the cover image link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          <>
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                Saving
              </>
            ) : (
              'Save'
            )}
          </>
        </Button>
      </form>
    </Form>
  );
}
