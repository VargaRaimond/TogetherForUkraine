import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Menu as MenuIcon } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { ILink } from "./MenuTabs";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface ISmallScreenMenuTabsProps {
  pages: ILink[];
  anchorElNav: null | HTMLElement;
  setAnchorElNav: (value: HTMLElement | null) => void;
}

const SmallScreenMenuTabs = ({
  pages,
  anchorElNav,
  setAnchorElNav,
}: ISmallScreenMenuTabsProps) => {
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, [setAnchorElNav]);

  const handleMenuItemClick = useCallback(
    (pathTo) => {
      handleCloseNavMenu();
      navigate(pathTo, { replace: true });
    },
    [handleCloseNavMenu, navigate]
  );

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page) => (
            <MenuItem
              key={page.name}
              onClick={() => handleMenuItemClick(page.pathTo)}
            >
              <Typography textAlign="center">{page.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
      >
        Together for Ukraine
      </Typography>
    </>
  );
};

export default SmallScreenMenuTabs;
