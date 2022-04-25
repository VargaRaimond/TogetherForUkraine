import { SyntheticEvent, useCallback, useMemo } from "react";
import { AutocompleteValue, IconButton, Toolbar, Tooltip } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchBar from "../../utils/SearchBar";
import { IOfferTableEntry } from "./GetHelpPage";

interface IGetHelpTableToolbarProps {
  offers: IOfferTableEntry[];
  setOffers: (offers: IOfferTableEntry[]) => void;
}

const GetHelpTableToolbar = ({
  offers,
  setOffers,
}: IGetHelpTableToolbarProps) => {
  const options = useMemo(() => offers.map(({ name }) => name), [offers]);

  const searchOnChangeHandler = useCallback(
    (
      event: SyntheticEvent,
      value: AutocompleteValue<string, undefined, undefined, undefined>
    ) => {
      setOffers(
        value === null
          ? offers
          : offers.filter(({ name }) =>
              name.toLowerCase().includes(value.toLowerCase())
            )
      );
    },
    [offers, setOffers]
  );

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Tooltip title="Search bar">
        <SearchBar
          options={options}
          searchOnChangeHandler={searchOnChangeHandler}
        />
      </Tooltip>
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default GetHelpTableToolbar;
