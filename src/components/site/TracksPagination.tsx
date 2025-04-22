'use client';
import React, { useState } from 'react';

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
  const [currentPage, setCurrentPage] = useState(meta.page);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${currentPage - 1}`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </PaginationItem>
        {Array.from({ length: meta.totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={`?page=${pageNumber}`}
                isActive={currentPage === pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
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
            href={`?page=${currentPage + 1}`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === meta.totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
