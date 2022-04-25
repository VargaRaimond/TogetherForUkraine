import * as React from "react";
import { IconButton, Toolbar, Tooltip } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

const GenericTableToolbar = () => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {/* todo: search bar */}
      {/*<Tooltip title="Search bar" />*/}
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default GenericTableToolbar;
