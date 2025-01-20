import Typography from '../Typography/Typography';
import './Table.css';

export type TableRow = Record<string, number | string>;

type Column = {
  displayText: string;
  key: string;
  accessor(row: TableRow): string | number;
};

interface Props<TData> {
  columns: Column[];
  data: TData[];
  testId?: string;
}

const Table = <TData extends TableRow>({
  columns,
  data,
  testId = 'table'
}: Props<TData>) => {
  return (
    <div className="app-table-wrapper" data-testid={testId}>
      <table
        className="app-table"
        tabIndex={0}
        role="presentation"
        aria-label="crowed funding table"
      >
        <thead className="app-table-head">
          <tr>
            {columns.map((column) => (
              <th key={column.key} tabIndex={0}>
                <Typography color="--white-color">
                  {column.displayText}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="app-table-body">
          {data.map((item) => (
            <tr key={item['s.no']}>
              {columns.map((column) => (
                <td key={column.key} tabIndex={0}>
                  <Typography>{column.accessor(item)}</Typography>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
