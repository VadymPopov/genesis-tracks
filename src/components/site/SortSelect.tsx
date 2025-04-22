'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { buildQueryParams } from '@/lib/utils';

export default function SortSelect() {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const router = useRouter();

  const handleSortChange = (value: string) => {
    setSelectedValue(value);
    const [sort, order] = value.split('_');
    const params = buildQueryParams({ sort, order });
    router.push(`?${params}`);
  };

  return (
    <Select onValueChange={handleSortChange} value={selectedValue}>
      <SelectTrigger className="w-[180px]">
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
      </SelectContent>
    </Select>
  );
}
