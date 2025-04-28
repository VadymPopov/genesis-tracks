'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useAppContext } from '@/providers';

export default function TracksPagination() {
  const { tracks } = useAppContext();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const createPageLink = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', page.toString());
    return `?${newParams.toString()}`;
  };

  if (!tracks.meta || tracks.meta.totalPages <= 1) {
    return null;
  }

  return (
    <Pagination data-testid="pagination">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageLink(currentPage - 1)}
            disabled={currentPage === 1}
            data-testid="pagination-prev"
          />
        </PaginationItem>
        {Array.from({ length: tracks.meta.totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={createPageLink(pageNumber)}
                isActive={currentPage === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={createPageLink(currentPage + 1)}
            disabled={currentPage === tracks.meta.totalPages}
            data-testid="pagination-next"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
