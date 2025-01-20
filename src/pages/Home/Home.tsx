import React, { useEffect, useMemo, useState } from 'react';
import Table from '../../components/common/Table/Table';
import Pagination from '../../components/common/Pagination/Pagination';
import { fetchCrowdFunding } from '../../services/api/crowdFunding';
import Typography from '../../components/common/Typography/Typography';
import usePagination from '../../hooks/usePagination';
import { CrowdFunding } from '../../types/crowdFunding';
import { MAX_ITEMS_PER_PAGE, TableColumns } from '../../constants';
import './Home.css';

const Home: React.FC = () => {
  const [crowdFundingList, setCrowdFundingList] = useState<CrowdFunding[]>([]);
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
        setLoading(true);
        const data = await fetchCrowdFunding<CrowdFunding[]>();

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
    <section className="app-home">
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>{error}</Typography>}
      {crowdFundingListWithPaged.length > 0 && (
        <Table columns={TableColumns} data={crowdFundingListWithPaged} />
      )}
      <Pagination {...paginationInfo} />
    </section>
  );
};

export default Home;
