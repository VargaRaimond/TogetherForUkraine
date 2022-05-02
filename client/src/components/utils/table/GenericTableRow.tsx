import React, { useMemo } from "react";
import { TableCell, TableRow } from "@mui/material";
import { IGenericTableRow } from "./GenericTable";

interface IGenericTableRowProps {
  row: IGenericTableRow;
}

const GenericTableRow = ({ row }: IGenericTableRowProps) => {
  const displayedRowColumns = useMemo(() => {
    const tempRowColumns = { ...row, id: undefined };
    if (tempRowColumns.id === undefined) {
      delete tempRowColumns.id;
    }
    return tempRowColumns;
  }, [row]);

  const getValue = (value: any) =>
    value && value instanceof Date ? value.toDateString() : value;

  return (
    <TableRow hover tabIndex={-1} key={row.id}>
      {Object.entries(displayedRowColumns).map(([key, value], idx) => {
        return (
          <TableCell
            align={React.isValidElement(value) ? "center" : "left"}
            key={`${row.id}-${idx}`}
          >
            {getValue(value)}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default GenericTableRow;
