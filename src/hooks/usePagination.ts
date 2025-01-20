import { useState, useCallback } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

export interface UsePaginationResult {
  hasNext: boolean;
  hasPrev: boolean;
  nextPageClick: () => void;
  prevPageClick: () => void;
  currentPage: number;
  totalPages: number;
  range: {
    from: number;
    end: number;
  };
}

const usePagination = ({
  totalItems,
  itemsPerPage
}: UsePaginationProps): UsePaginationResult => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  const endIndex = page * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;

  const nextPageClick = useCallback(() => {
    if (hasNext) {
      setPage((prev) => prev + 1);
    }
  }, [hasNext]);

  const prevPageClick = useCallback(() => {
    if (hasPrev) {
      setPage((prev) => prev - 1);
    }
  }, [hasPrev]);

  return {
    hasNext,
    hasPrev,
    nextPageClick,
    prevPageClick,
    currentPage: page,
    totalPages,
    range: {
      from: startIndex,
      end: endIndex
    }
  };
};

export default usePagination;
