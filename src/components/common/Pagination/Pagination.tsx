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
      <Button onClick={prevPageClick} disabled={!hasPrev} tabIndex={0}>
        Previous
      </Button>
      <Typography as="div" className="page-info">
        <Typography tabIndex={0}>{currentPage}</Typography> of{' '}
        <Typography tabIndex={0}>{totalPages}</Typography>
      </Typography>
      <Button onClick={nextPageClick} disabled={!hasNext} tabIndex={0}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
