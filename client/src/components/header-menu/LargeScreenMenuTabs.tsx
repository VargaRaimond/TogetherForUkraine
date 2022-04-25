import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import { ILink } from "./MenuTabs";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

interface ILargeScreenMenuTabsProps {
  pages: ILink[];
  setAnchorElNav: (value: HTMLElement | null) => void;
}
const LargeScreenMenuTabs = ({
  pages,
  setAnchorElNav,
}: ILargeScreenMenuTabsProps) => {
  const navigate = useNavigate();

  const handleOnClick = useCallback(
    (to) => {
      setAnchorElNav(null);
      navigate(to, { replace: true });
    },
    [navigate, setAnchorElNav]
  );

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
            key={page.name}
            onClick={() => handleOnClick(page.pathTo)}
            sx={{
              my: 2,
              color: "white",
              display: "block",
              paddingLeft: "25px",
            }}
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default LargeScreenMenuTabs;
