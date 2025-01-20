import { TableRow } from '../../components/common/Table/Table';

export const TableCrowedFundingColumns = [
  {
    displayText: 'S.No.',
    key: 'serial-no',
    accessor: (row: TableRow) => row['s.no']
  },
  {
    displayText: 'Percentage funded',
    key: 'percentage-funded',
    accessor: (row: TableRow) => row['percentage.funded']
  },
  {
    displayText: 'Amount pledged',
    key: 'amount-pledged',
    accessor: (row: TableRow) => row['amt.pledged']
  }
];
