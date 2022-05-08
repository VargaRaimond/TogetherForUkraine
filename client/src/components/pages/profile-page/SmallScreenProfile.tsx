import React from "react";
import { Box, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileForm, { RemovableJson } from "./ProfileForm";

const SmallScreenProfile = () => {
  const { user } = useAuth0();

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
        flexDirection: "column",
        width: "100%",
        pl: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h2" marginBottom="25px">
          My profile
        </Typography>
        <Box
          component={"img"}
          src={user?.picture}
          alt={user?.name}
          sx={{
            maxWidth: "100px",
            maxHeight: "100px",
            paddingRight: "45px",
          }}
        />
      </div>
      <ProfileForm />
      <RemovableJson />
    </Box>
  );
};
export default SmallScreenProfile;
