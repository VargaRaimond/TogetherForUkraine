import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AutocompleteValue, Toolbar } from "@mui/material";
import SearchBar from "../../utils/SearchBar";
import { IOfferTableEntry } from "./GetHelpPage";
import GetHelpFilters from "./GetHelpFilters";

interface IGetHelpTableToolbarProps {
  offers: IOfferTableEntry[];
  setOffers: (offers: IOfferTableEntry[]) => void;
}

const GetHelpTableToolbar = ({
  offers,
  setOffers,
}: IGetHelpTableToolbarProps) => {
  const options = useMemo(() => offers.map(({ name }) => name), [offers]);

  const [searchedWord, setSearchWord] = useState<string | undefined>(undefined);
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    category: "",
  });

  const searchOnChangeHandler = useCallback(
    (
      event: SyntheticEvent,
      value: AutocompleteValue<string, undefined, undefined, undefined>
    ) => {
      setSearchWord(value?.toLowerCase() || undefined);
    },
    []
  );

  useEffect(() => {
    const { location: selectedLocation, category: selectedCategory } =
      selectedFilters;

    const offersAfterSearch =
      searchedWord === undefined
        ? offers
        : offers.filter(({ name }) =>
            name.toLowerCase().includes(searchedWord)
          );

    setOffers(
      offersAfterSearch.filter(({ location, category }) => {
        if (selectedLocation !== "" && selectedCategory !== "") {
          return location === selectedLocation && category === selectedCategory;
        }

        if (selectedLocation === "" && selectedCategory !== "") {
          return category === selectedCategory;
        }

        if (selectedLocation !== "" && selectedCategory === "") {
          return location === selectedLocation;
        }

        return true;
      })
    );
  }, [offers, searchedWord, selectedFilters, setOffers]);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <SearchBar
        options={options}
        searchOnChangeHandler={searchOnChangeHandler}
      />
      <GetHelpFilters offers={offers} setSelectedFilters={setSelectedFilters} />
    </Toolbar>
  );
};

export default GetHelpTableToolbar;
