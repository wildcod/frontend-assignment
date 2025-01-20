import React, { useEffect, useMemo, useState } from 'react';
import TableCrowedFunding from '../../components/common/Table/Table';
import Pagination from '../../components/common/Pagination/Pagination';
import { fetchCrowdFunding } from '../../services/api/crowdFunding';
import Typography from '../../components/common/Typography/Typography';
import usePagination from '../../hooks/usePagination';
import { CrowedFundingType } from '../../types/crowedFundingType';
import { MAX_ITEMS_PER_PAGE } from '../../constants';
import { TableCrowedFundingColumns } from '../../constants/tableColumns/crowedFunding';
import './CrowedFunding.css';

const CrowedFunding: React.FC = () => {
  const [crowdFundingList, setCrowdFundingList] = useState<CrowedFundingType[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { range, ...paginationInfo } = usePagination({
    totalItems: crowdFundingList.length,
    itemsPerPage: MAX_ITEMS_PER_PAGE
  });

  const crowdFundingListWithPaged = useMemo(() => {
    if (crowdFundingList.length) {
      return crowdFundingList.slice(range.from, range.end);
    }

    return crowdFundingList;
  }, [crowdFundingList, range.from, range.end]);

  useEffect(() => {
    // Handling race condition
    let ignore = false;

    const fetchCrowdFundingData = async () => {
      try {
        setError('');
        setLoading(true);
        const data = await fetchCrowdFunding<CrowedFundingType[]>();

        if (!ignore && data) {
          setCrowdFundingList(data);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCrowdFundingData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="app-crowed-funding">
      {loading && (
        <Typography as="p" align="center">
          Loading...
        </Typography>
      )}
      {error && (
        <Typography as="p" align="center">
          {error}
        </Typography>
      )}
      {crowdFundingListWithPaged.length > 0 && (
        <>
          <TableCrowedFunding<CrowedFundingType>
            columns={TableCrowedFundingColumns}
            data={crowdFundingListWithPaged}
          />
          <Pagination {...paginationInfo} />
        </>
      )}
    </section>
  );
};

export default CrowedFunding;
