import TracksList from '../components/site/TracksList';

import TracksPagination from '@/components/site/TracksPagination';

export default async function Home() {
  const data = await fetch('http://localhost:8000/api/tracks');
  const tracks = await data.json();

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <header className="row-start-1 flex gap-5">
        <p>Logo is here</p>
        <p>Music Tracks App</p>
      </header>
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        {tracks.data && <TracksList tracks={tracks.data} />}
        <TracksPagination meta={tracks.meta} />
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
