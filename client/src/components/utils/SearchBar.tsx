import React, { SyntheticEvent } from "react";
import {
  alpha,
  styled,
  Autocomplete,
  AutocompleteValue,
  InputBase,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  maxWidth: "300px",

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

interface SearchBarProps {
  placeholder?: string;
  options: string[];
  searchOnChangeHandler: (
    event: SyntheticEvent,
    value: AutocompleteValue<string, undefined, undefined, undefined>
  ) => void;
}

const SearchBar: React.FunctionComponent<SearchBarProps> = ({
  placeholder = "Search...",
  options,
  searchOnChangeHandler,
}) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchOutlined />
      </SearchIconWrapper>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={options}
        onChange={searchOnChangeHandler}
        renderInput={(params) => (
          <StyledInputBase
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            autoFocus
            placeholder={placeholder}
          />
        )}
      />
    </Search>
  );
};

export default SearchBar;
