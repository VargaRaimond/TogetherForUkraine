import { useMemo } from "react";
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

  return (
    <TableRow hover tabIndex={-1} key={row.id}>
      {Object.entries(displayedRowColumns).map(([key, value], idx) => {
        return (
          <TableCell align="left" key={`${row.id}-${idx}`}>
            {value}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default GenericTableRow;
