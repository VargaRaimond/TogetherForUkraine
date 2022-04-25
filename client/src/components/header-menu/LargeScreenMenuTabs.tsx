import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";

interface ILargeScreenMenuTabsProps {
  pages: string[]; // TODO: pages should be more than strings
  setAnchorElNav: (value: HTMLElement | null) => void;
}
const LargeScreenMenuTabs = ({
  pages,
  setAnchorElNav,
}: ILargeScreenMenuTabsProps) => {
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontWeight: "bold",
        }}
      >
        Together for Ukraine
      </Typography>

      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page}
            onClick={handleCloseNavMenu}
            sx={{
              my: 2,
              color: "white",
              display: "block",
              paddingLeft: "25px",
            }}
          >
            {page}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default LargeScreenMenuTabs;
