import { useAuth0 } from "@auth0/auth0-react";
import * as React from "react";
import { Button } from "@mui/material";

const AccountSettingsNotLoggedIn = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Button variant={"contained"} onClick={() => loginWithRedirect()}>
        LogIn
      </Button>
      <Button variant={"contained"}>Register</Button>
    </>
  );
};

export default AccountSettingsNotLoggedIn;
