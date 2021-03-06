import { useCallback, useState, MouseEvent, useMemo } from "react";
import {
  IconButton,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Menu,
  Box,
  Button,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { IOfferTableEntry } from "./GetHelpPage";
import Tooltip from "@mui/material/Tooltip";

interface IGetHelpFiltersProps {
  offers: IOfferTableEntry[];
  setSelectedFilters: (selectedFilters: {
    location: string;
    category: string;
  }) => void;
}

enum ItemType {
  LOCATION = "location",
  CATEGORY = "category",
}

const GetHelpFilters = ({
  offers,
  setSelectedFilters,
}: IGetHelpFiltersProps) => {
  const [anchorElFilter, setAnchorElFilter] = useState<null | HTMLElement>(
    null
  );

  const categories = useMemo(
    () => [...new Set(offers.map(({ category }) => category))],
    [offers]
  );

  const locations = useMemo(
    () => [...new Set(offers.map(({ location }) => location))],
    [offers]
  );

  const [selectedCategory, setCategory] = useState<string>("");
  const [selectedLocation, setLocation] = useState<string>("");

  const handleOpenFilterMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setCategory("");
    setLocation("");
    setAnchorElFilter(null);
  };

  const onChangeHandler = useCallback(
    (event: SelectChangeEvent, item: ItemType) => {
      switch (item) {
        case ItemType.LOCATION:
          setLocation(event.target.value);
          break;
        case ItemType.CATEGORY:
          setCategory(event.target.value);
          break;
        default:
          break;
      }
    },
    []
  );

  const onSubmitHandler = useCallback(() => {
    handleCloseFilterMenu();
    setSelectedFilters({
      location: selectedLocation,
      category: selectedCategory,
    });
  }, [selectedCategory, selectedLocation, setSelectedFilters]);

  return (
    <>
      <Tooltip title="Open filter menu">
        <IconButton onClick={handleOpenFilterMenu}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-filter"
        anchorEl={anchorElFilter}
        keepMounted
        open={Boolean(anchorElFilter)}
        onClose={handleCloseFilterMenu}
      >
        <Box sx={{ padding: "15px" }}>
          <InputLabel id="category-filter-label">Category</InputLabel>
          <Select
            sx={{ width: "220px" }}
            labelId="category-filter-label"
            id="category-filter-select"
            label="Category"
            value={selectedCategory}
            onChange={(e) => onChangeHandler(e, ItemType.CATEGORY)}
          >
            <MenuItem key="category" value="">
              None
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>

          <InputLabel id="location-filter-label">Location</InputLabel>
          <Select
            sx={{ width: "220px" }}
            labelId="location-filter-label"
            id="location-filter-select"
            label="Location"
            value={selectedLocation}
            onChange={(e) => onChangeHandler(e, ItemType.LOCATION)}
          >
            <MenuItem key="location" value="">
              None
            </MenuItem>
            {locations.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </Select>
          <Button
            sx={{ display: "block", marginTop: "10px" }}
            onClick={onSubmitHandler}
            type="submit"
          >
            Filter
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default GetHelpFilters;
