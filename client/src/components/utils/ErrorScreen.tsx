import React from "react";
import { Typography } from "@mui/material";
import { Dangerous } from "@mui/icons-material";

const ErrorScreen = ({ error }: { error: any }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "50vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Dangerous color="error" fontSize="large" />
      <Typography variant="body1" color="error" fontWeight="bold">
        {error}
      </Typography>
    </div>
  );
};
export default ErrorScreen;
