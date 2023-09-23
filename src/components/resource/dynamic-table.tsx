import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export interface DynamicTableParams {
  getValue: (field: string) => any;
  values: any;
}

export interface DynamicTableCol {
  field: string;
  headerName: (() => React.ReactNode) | string;
  renderCell?: (value: DynamicTableParams) => React.ReactNode;
}

export interface DynamicTableProps {
  columns: DynamicTableCol[];
  rows: any[];
}

const DynamicTable = (props: DynamicTableProps) => {
  const { columns, rows } = props;

  const parseParams = (row: any): DynamicTableParams => ({
    getValue: (field) => row[field],
    values: row,
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.field}>
              {column.headerName as string}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {columns.map((column) => (
              <TableCell key={column.field}>
                {column.renderCell
                  ? column.renderCell(parseParams(row))
                  : row[column.field]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DynamicTable;
