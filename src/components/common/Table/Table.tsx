import Typography from '../Typography/Typography';
import './Table.css';

type Column = {
  displayText: string;
  key: string;
};

interface Props<TData> {
  columns: Column[];
  data: TData[];
}

const Table = <TData extends Record<string, number | string>>({
  columns,
  data
}: Props<TData>) => {
  return (
    <div className="app-table-wrapper">
      <table className="app-table">
        <thead className="app-table-head">
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                <Typography>{column.displayText}</Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="app-table-body">
          {data.map((item) => (
            <tr key={item['s.no']}>
              <td>
                <Typography>{item['s.no']}</Typography>
              </td>
              <td>
                <Typography>{item['percentage.funded']}</Typography>
              </td>
              <td>
                <Typography>{item['amt.pledged']}</Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
