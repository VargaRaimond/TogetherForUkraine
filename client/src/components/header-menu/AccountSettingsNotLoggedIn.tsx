import { useAuth0 } from "@auth0/auth0-react";
import * as React from "react";
import { Box, Button, styled } from "@mui/material";

const LoginButton = styled(Button)(() => ({
  borderColor: "white",
  color: "white",
  ":hover": { borderColor: "black", color: "black" },
  fontWeight: "bold",
}));

const RegisterButton = styled(Button)(() => ({
  color: "white",
  ":hover": { color: "black" },
}));

const AccountSettingsNotLoggedIn = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <LoginButton
        variant="outlined"
        onClick={() => loginWithRedirect()}
        size="large"
      >
        Log In
      </LoginButton>
      {/* TODO: register button */}
      <RegisterButton variant="text">Register</RegisterButton>
    </Box>
  );
};

export default AccountSettingsNotLoggedIn;
