import { ChangeEvent } from "react";
import { TablePagination } from "@mui/material";

interface IGenericTablePaginationProps {
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  totalElements: number;
}
const GenericTablePagination = ({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  totalElements,
}: IGenericTablePaginationProps) => {
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={totalElements}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default GenericTablePagination;
