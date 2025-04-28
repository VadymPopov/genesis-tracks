import Image from 'next/image';

import TracksList from '../../components/site/TracksList';

import CreateModal from '@/components/site/CreateTrackModal';
import FilterSelect from '@/components/site/FilterSelect';
import SearchBar from '@/components/site/SearchBar';
import SortSelect from '@/components/site/SortSelect';
import TracksPagination from '@/components/site/TracksPagination';
import { getTracks } from '@/lib/getTracks';
import { AppProvider } from '@/providers';

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
    <AppProvider fallbackData={initialData}>
      <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
        <header className="row-start-1 flex items-center justify-center gap-5">
          <Image src="/logo.svg" alt="Audio Wave Icon" width={64} height={64} />
          <h1 data-testid="tracks-header" className="text-2xl font-semibold">
            Music Tracks App
          </h1>
        </header>
        <main className="row-start-2 flex w-full flex-col items-center gap-[32px] sm:items-start">
          <div className="flex w-full flex-col justify-between gap-4 sm:flex-row">
            <div className="flex justify-between gap-4">
              <SortSelect />
              <FilterSelect />
            </div>
            <div className="flex flex-col justify-between gap-4">
              <SearchBar />
              <CreateModal />
            </div>
          </div>

          <TracksList />
          <TracksPagination />
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
    </AppProvider>
  );
}
