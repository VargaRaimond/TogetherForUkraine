import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useCallback } from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { AccountCircle } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const AccountSettingsLoggedIn = () => {
  const { logout } = useAuth0();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  const handleMenuItemClick = useCallback(
    (pathTo) => {
      handleCloseUserMenu();
      navigate(pathTo, { replace: true });
    },
    [handleCloseUserMenu, navigate]
  );

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu}>
          <AccountCircle fontSize={"large"} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          onClick={() => {
            handleMenuItemClick("/profile");
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout({ returnTo: window.location.origin });
            handleMenuItemClick("/"); // todo
          }}
        >
          Log Out
        </MenuItem>

        {/* TODO */}
        {/*{settings.map(({ name, pathTo }) => (*/}
        {/*  <MenuItem key={name} onClick={() => handleMenuItemClick(pathTo)}>*/}
        {/*    <Typography textAlign="center">{name}</Typography>*/}
        {/*  </MenuItem>*/}
        {/*))}*/}
      </Menu>
    </Box>
  );
};

export default AccountSettingsLoggedIn;
