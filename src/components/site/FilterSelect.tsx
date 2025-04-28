'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Button } from '../ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateQueryParams } from '@/hooks/useUpdateQueryParams';
import { useAppContext } from '@/providers';

export default function FilterSelect() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const genre = searchParams.get('genre') || '';
  const { genres } = useAppContext();
  const [selectedValue, setSelectedValue] = useState<string>(genre || '');

  const updateQueryParam = useUpdateQueryParams();

  const handleGenreChange = (value: string) => {
    setSelectedValue(value);
    updateQueryParam({ genre: value });
    setOpen(false);
  };

  const handleClearSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelectedValue('');
    updateQueryParam({ genre: null });
    setOpen(false);
  };

  return (
    <Select
      onOpenChange={setOpen}
      open={open}
      onValueChange={handleGenreChange}
      value={selectedValue}
      data-testid="filter-genre"
    >
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="Genre" />
      </SelectTrigger>
      <SelectContent>
        {genres.map((genre) => (
          <SelectItem key={genre} value={genre}>
            {genre}
          </SelectItem>
        ))}
        <SelectSeparator />
        <Button
          className="w-full px-2"
          variant="secondary"
          size="sm"
          onClick={handleClearSelection}
        >
          Clear
        </Button>
      </SelectContent>
    </Select>
  );
}
