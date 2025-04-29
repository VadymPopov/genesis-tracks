import { z } from 'zod';

export const EditTrackFormSchema = z.object({
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

export const CreateTrackFormSchema = z.object({
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

export const UploadAudioFormSchema = z.object({
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
