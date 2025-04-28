'use client';
import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import debounce from 'lodash.debounce';
import { Search, X } from 'lucide-react';

import { Input } from '../ui/input';

import { useUpdateQueryParams } from '@/hooks/useUpdateQueryParams';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState<string>(search || '');

  const updateQueryParam = useUpdateQueryParams();

  const debouncedUpdateQueryParam = useMemo(
    () =>
      debounce((value: string) => {
        updateQueryParam({ search: value || null });
      }, 500),
    [updateQueryParam],
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    debouncedUpdateQueryParam(value);
  };

  const handleClearSelection = () => {
    setSearchValue('');
    updateQueryParam({ search: null });
  };

  return (
    <div className="relative">
      <Input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Search"
        className="pr-8 pl-10"
        data-testid="search-input"
      />
      <Search
        className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
        size={24}
      />
      {searchValue && (
        <button
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-400"
          onClick={handleClearSelection}
          aria-label="Clear search"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}
