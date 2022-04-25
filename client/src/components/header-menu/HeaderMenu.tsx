import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import AccountSettings from "./AccountSettings";
import MenuTabs from "./MenuTabs";

const HeaderMenu = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MenuTabs />
          <AccountSettings />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderMenu;
