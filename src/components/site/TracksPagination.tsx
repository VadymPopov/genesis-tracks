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

type TracksPaginationProps = {
  meta: { limit: number; page: number; total: number; totalPages: number };
};

export default function TracksPagination({ meta }: TracksPaginationProps) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const createPageLink = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', page.toString());
    return `?${newParams.toString()}`;
  };

  if (!meta || meta.totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageLink(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </PaginationItem>
        {Array.from({ length: meta.totalPages }, (_, index) => {
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
            disabled={currentPage === meta.totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
