import React from "react";
import { Box, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileForm, { RemovableJson } from "./ProfileForm";

const LargeScreenProfile = () => {
  const { user } = useAuth0();

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: "row",
        alignItems: "start",
        pl: "10%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <Typography variant="h2" marginBottom="25px">
          My profile
        </Typography>
        <ProfileForm />
        <RemovableJson />
      </div>
      <Box
        component={"img"}
        src={user?.picture}
        alt={user?.name}
        sx={{
          maxWidth: "200px",
          maxHeight: "200px",
          marginTop: "10px",
          marginLeft: "5%",
          display: { xs: "none", md: "block" },
        }}
      />
    </Box>
  );
};

export default LargeScreenProfile;
