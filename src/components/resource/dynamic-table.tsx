import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export interface DynamicTableParams<Row> {
  getValue: (field: string) => unknown;
  values: Row;
}

export interface DynamicTableCol<Row> {
  field: string;
  headerName: (() => React.ReactNode) | string;
  renderCell?: (value: Row) => React.ReactNode;
}

export interface DynamicTableProps<Row> {
  columns: DynamicTableCol<Row>[];
  rows: Row[];
}

const DynamicTable = <Row extends Record<string, any>>(
  props: DynamicTableProps<Row>
) => {
  const { columns, rows } = props;

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
              <TableCell key={column.field} align="left">
                {column.renderCell ? column.renderCell(row) : row[column.field]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DynamicTable;
