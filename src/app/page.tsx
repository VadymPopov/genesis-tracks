import TracksList from '../components/site/TracksList';

import FilterSelect from '@/components/site/FilterSelect';
import SearchBar from '@/components/site/SearchBar';
import SortSelect from '@/components/site/SortSelect';
import TracksPagination from '@/components/site/TracksPagination';
import { getTracks } from '@/lib/getTracks';

type Params = Promise<{
  page: string;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  artist?: string;
  genre?: string;
}>;

export default async function Home({ searchParams }: { searchParams: Params }) {
  const params = await searchParams;
  const query = { ...params, page: params.page || '1' };
  const initialData = await getTracks(query);

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <header className="row-start-1 flex gap-5">
        <p>Logo is here</p>
        <p>Music Tracks App</p>
      </header>
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <div className="flex w-full justify-between">
          <div className="flex gap-4">
            <SortSelect />
            <FilterSelect />
          </div>
          <div>
            <SearchBar />
          </div>
        </div>

        <TracksList initialData={initialData} query={query} />
        <TracksPagination meta={initialData.meta} />
      </main>
      <footer className="row-start-3 flex items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/VadymPopov"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed by Vadym Popov
        </a>
      </footer>
    </div>
  );
}
