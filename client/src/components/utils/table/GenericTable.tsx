import * as React from "react";
import { useMemo, useState } from "react";
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
import GenericTableToolbar from "./GenericTableToolbar";
import GenericTablePagination from "./GenericTablePagination";
import GenericTableRow from "./GenericTableRow";

export interface ISmaTableRow {
  [key: string]: any;
}

interface ISmaTableProps {
  rows: ISmaTableRow[] /* [{keyA: valueA1, keyB: valueB1 }, {keyA: valueA2, keyB: valueB2 }] */;
  headCells: readonly HeadCell<ISmaTableRow>[] /* [{id: keyA (must be the key from above), label: labelName: }] */;
}

function GenericTable({ rows: initialRows, headCells }: ISmaTableProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof ISmaTableRow>("id");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ISmaTableRow
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const arrangedRows = useMemo(() => {
    return initialRows.map((row) => {
      const rowInOrder: ISmaTableRow = {};

      headCells.forEach(({ id }) => {
        rowInOrder[id] = row[id];
      });

      return rowInOrder;
    });
  }, [headCells, initialRows]);

  // Will be very helpful after adding the searchBar and filters
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rows, setRows] = useState<ISmaTableRow[]>(arrangedRows);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = useMemo(
    () => (page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0),
    [page, rows.length, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <GenericTableToolbar />

      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
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
                  return <GenericTableRow key={`${index}-sma-row`} row={row} />;
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
