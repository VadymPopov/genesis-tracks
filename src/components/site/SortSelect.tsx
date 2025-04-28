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

export default function SortSelect() {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const [selectedValue, setSelectedValue] = useState<string>(
    sort && order ? `${sort}_${order}` : '',
  );

  const updateQueryParam = useUpdateQueryParams();

  const handleSortChange = (value: string) => {
    setSelectedValue(value);
    const [sort, order] = value.split('_');
    updateQueryParam({ sort, order });
    setOpen(false);
  };

  const handleClearSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelectedValue('');
    updateQueryParam({ sort: null, order: null });
    setOpen(false);
  };

  return (
    <Select
      onOpenChange={setOpen}
      open={open}
      onValueChange={handleSortChange}
      value={selectedValue}
      data-testid="sort-select"
    >
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="title_asc">Title (A → Z)</SelectItem>
        <SelectItem value="title_desc">Title (Z → A)</SelectItem>
        <SelectItem value="artist_asc">Artist (A → Z)</SelectItem>
        <SelectItem value="artist_desc">Artist (Z → A)</SelectItem>
        <SelectItem value="album_asc">Album (A → Z)</SelectItem>
        <SelectItem value="album_desc">Album (Z → A)</SelectItem>
        <SelectItem value="createdAt_asc">Created At (Oldest First)</SelectItem>
        <SelectItem value="createdAt_desc">
          Created At (Newest First)
        </SelectItem>
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
