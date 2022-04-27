import { MouseEvent } from "react";
import {
  Box,
  styled,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Theme,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Order } from "./GenericTableComparators";

const StyledTableCell = styled(TableCell)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.primary.light,
}));

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
          <StyledTableCell
            key={headCell.id as string}
            align={"left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
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
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default GenericTableHead;
