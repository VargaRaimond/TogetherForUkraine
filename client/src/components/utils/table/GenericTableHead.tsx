import { MouseEvent } from "react";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Order } from "./GenericTableComparators";

export interface HeadCell<HeadCellDataType> {
  id: keyof HeadCellDataType;
  label?: string;
}

interface IGenericTableHeadProps<HeadCellDataType> {
  headCells: readonly HeadCell<HeadCellDataType>[];
  order: Order;
  orderBy: string;
  onRequestSort: (
    event: MouseEvent<unknown>,
    property: keyof HeadCellDataType
  ) => void;
}

function GenericTableHead<HeadCellDataType>({
  headCells,
  order,
  orderBy,
  onRequestSort,
}: IGenericTableHeadProps<HeadCellDataType>) {
  const createSortHandler =
    (property: keyof HeadCellDataType) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id as string}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.light,
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default GenericTableHead;
