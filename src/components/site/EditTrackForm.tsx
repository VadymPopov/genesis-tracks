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
import { EditTrackFormSchema } from '@/schemas';
import { Track } from '@/types';

export default function EditTrackForm({
  track,
  onDialogClose,
}: {
  track: Track;
  onDialogClose: () => void;
}) {
  const { editTrack, genreList } = useAppContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof EditTrackFormSchema>>({
    resolver: zodResolver(EditTrackFormSchema),
    defaultValues: {
      title: track.title,
      artist: track.artist,
      album: track.album,
      genres: track.genres,
      coverImage:
        track.coverImage || 'https://www.picsum.photos/id/237/200/300',
    },
  });

  async function onSubmit(values: z.infer<typeof EditTrackFormSchema>) {
    setIsSubmitting(true);

    try {
      await editTrack({ ...track, ...values });
      form.reset();
      onDialogClose();
      toast.success(
        `${values.title} by ${values.artist} updated successfully!`,
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
