import { useMemo, useState, MouseEvent } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { getComparator, Order } from "./GenericTableComparators";
import GenericTableHead, { HeadCell } from "./GenericTableHead";
import GenericTablePagination from "./GenericTablePagination";
import GenericTableRow from "./GenericTableRow";

export interface IGenericTableRow {
  [key: string]: any;
}

interface IGenericTableProps {
  rows: IGenericTableRow[] /* [{keyA: valueA1, keyB: valueB1 }, {keyA: valueA2, keyB: valueB2 }] */;
  headCells: readonly HeadCell<IGenericTableRow>[] /* [{id: keyA (must be the key from above), label: labelName: }] */;
  showSearchBar?: boolean;
}

function GenericTable({ rows: initialRows, headCells }: IGenericTableProps) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof IGenericTableRow>("id");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof IGenericTableRow
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const rows = useMemo(() => {
    return initialRows.map((row) => {
      const rowInOrder: IGenericTableRow = {};

      headCells.forEach(({ id }) => {
        rowInOrder[id] = row[id];
      });

      return rowInOrder;
    });
  }, [headCells, initialRows]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = useMemo(
    () => (page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0),
    [page, rows.length, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <GenericTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy as string}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return <GenericTableRow key={`${index}-row`} row={row} />;
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <GenericTablePagination
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          totalElements={rows.length}
        />
      </Paper>
    </Box>
  );
}

export default GenericTable;
