'use client';

import clsx from 'clsx';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import DeleteModal from './DeleteModal';

import { useAppContext } from '@/providers';

export function Flyout() {
  const {
    selectedTracks,
    deleteSelectedTracks,
    selectAllTracks,
    unselectAllTracks,
    tracks,
  } = useAppContext();
  const message = `${selectedTracks.length} track${selectedTracks.length !== 1 ? 's' : ''} selected`;

  const handleSelectAll = () => {
    if (selectedTracks.length === tracks.data.length) {
      unselectAllTracks();
      toast.success('All tracks were unselected!');
    } else {
      selectAllTracks(tracks.data.map((track) => track.id));
      toast.success('All tracks were selected!');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSelectedTracks(selectedTracks);
      toast.success(`Selected tracks were deleted successfully!`);
    } catch (error) {
      console.log(error);
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to delete selected tracks',
      );
    }
  };

  return (
    <div
      data-testid="flyout-container"
      className={clsx(
        'fixed right-0 bottom-0 left-0 z-40 flex items-center justify-between bg-gradient-to-r from-blue-600 from-10% to-gray-600 to-80% p-3 px-8 py-2.5 shadow-lg transition-all',
      )}
    >
      <p className="font-semibold text-white md:text-lg xl:text-xl">
        {message}
      </p>
      <div className="flex gap-4">
        {tracks.data.length > 1 && (
          <Button onClick={handleSelectAll} variant={'secondary'}>
            {selectedTracks.length === tracks.data.length
              ? 'Unselect All'
              : 'Select All'}
          </Button>
        )}

        {selectedTracks.length > 0 && (
          <DeleteModal
            title="Delete multiple tracks"
            description={`Permanently delete ${selectedTracks.length} selected tracks?`}
            deleteFn={handleDelete}
            successMsg="Selected tracks deleted successfully!"
            errorMsg="Failed to delete multiple tracks"
          />
        )}
      </div>
    </div>
  );
}
