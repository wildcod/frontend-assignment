import { renderHook, act } from '@testing-library/react';
import usePagination from '../usePagination';

describe('usePagination', () => {
  const setupHook = (totalItems: number, itemsPerPage: number) => {
    return renderHook(() => usePagination({ totalItems, itemsPerPage }));
  };

  it('should initialize correctly with given totalItems and itemsPerPage', () => {
    const { result } = setupHook(50, 10); // 50 items, 10 items per page
    const { currentPage, totalPages, hasNext, hasPrev, range } = result.current;

    expect(currentPage).toBe(1);
    expect(totalPages).toBe(5);
    expect(hasNext).toBe(true);
    expect(hasPrev).toBe(false);
    expect(range).toEqual({ from: 0, end: 10 });
  });

  it('should go to the next page when nextPageClick is called', async () => {
    const { result } = setupHook(50, 10);

    act(() => {
      result.current.nextPageClick();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.range).toEqual({ from: 10, end: 20 });
    expect(result.current.hasPrev).toBe(true);
  });

  it('should not go past the last page', () => {
    const { result, rerender } = setupHook(30, 10);

    result.current.nextPageClick();
    rerender();
    result.current.nextPageClick();
    rerender();
    result.current.nextPageClick();
    rerender();
    result.current.nextPageClick();
    rerender();

    expect(result.current.currentPage).toBe(3); // Last page
    expect(result.current.hasNext).toBe(false);
    expect(result.current.range).toEqual({ from: 20, end: 30 });
  });

  it('should go to the previous page when prevPageClick is called', () => {
    const { result } = setupHook(50, 10);

    // Move to page 3
    act(() => {
      result.current.nextPageClick();
      result.current.nextPageClick();
    });

    // Go back to page 2
    act(() => {
      result.current.prevPageClick();
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.range).toEqual({ from: 10, end: 20 });
  });

  it('should not go below the first page', () => {
    const { result } = setupHook(50, 10);

    act(() => {
      result.current.prevPageClick(); // Attempt to go before page 1
    });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.hasPrev).toBe(false);
    expect(result.current.range).toEqual({ from: 0, end: 10 });
  });

  it('should handle edge cases with fewer total items than itemsPerPage', () => {
    const { result } = setupHook(5, 10); // Only 5 items, 10 items per page

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.hasNext).toBe(false);
    expect(result.current.hasPrev).toBe(false);
    expect(result.current.range).toEqual({ from: 0, end: 5 });
  });
});
