export type Track = {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genres: string[];
  slug: string;
  coverImage?: string;
  audioFile?: string;
  updatedAt: string;
  createdAt: string;
};

export type Meta = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export type TracksQuery = {
  page: string;
  sort?: string;
  order?: string;
  search?: string;
  artist?: string;
  genre?: string;
};
