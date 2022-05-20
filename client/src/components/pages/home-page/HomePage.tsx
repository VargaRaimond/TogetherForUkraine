import React from "react";
import { Box } from "@mui/material";
import StatsGrid from "./StatsGrid";

const HomePage = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        component="img"
        sx={{ width: "80%" }}
        alt="Together for Ukraine"
          src={process.env.PUBLIC_URL + "/logo.png"}
      />
      <StatsGrid />
    </div>
  );
};

export default HomePage;
