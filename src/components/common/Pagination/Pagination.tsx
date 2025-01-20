import React from 'react';
import './Pagination.css';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import { UsePaginationResult } from '../../../hooks/usePagination';

type Props = Omit<UsePaginationResult, 'range'>;

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  nextPageClick,
  prevPageClick,
  hasNext,
  hasPrev
}) => {
  return (
    <div className="app-table-pagination">
      <Button onClick={prevPageClick} disabled={!hasPrev}>
        Previous
      </Button>
      <Typography as="div" className="page-info">
        {currentPage} of {totalPages}
      </Typography>
      <Button onClick={nextPageClick} disabled={!hasNext}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
