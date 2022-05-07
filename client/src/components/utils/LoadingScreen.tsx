import { CircularProgress, Typography } from "@mui/material";
import React from "react";

const LoadingScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ mt: "10px" }}>
        Loading...
      </Typography>
    </div>
  );
};
export default LoadingScreen;
