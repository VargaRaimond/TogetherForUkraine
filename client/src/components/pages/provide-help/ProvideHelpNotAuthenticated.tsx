import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

const ProvideHelpNotAuthenticated = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        marginTop: "50px",
        zIndex: 10,
        width: "100%",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        Join our community
      </Typography>
      <Box sx={{ flexDirection: "row", marginTop: "25px" }}>
        <Button
          variant={"outlined"}
          size="large"
          onClick={() => loginWithRedirect()}
        >
          Log in
        </Button>
        {/* TODO: register button */}
        <Button size="large" variant="text">
          Register
        </Button>
      </Box>
    </div>
  );
};

export default ProvideHelpNotAuthenticated;
