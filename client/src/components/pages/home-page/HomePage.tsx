import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

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
        src={process.env.PUBLIC_URL + "/together-for-ukraine-text.png"}
      />
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 1, md: 2 }}
        justifyContent={"center"}
      >
        {[
          { description: "Active Volunteers", count: 5 },
          { description: "People we've helped", count: 1235 },
          { description: "Active Offers", count: 125 },
          { description: "Total Offers", count: 125 },
        ].map(({ description, count }) => (
          <Grid item xs={4.75} md={2.8}>
            <Card
              sx={{ backgroundColor: (theme) => theme.palette.primary.light }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  minHeight: "150px",
                }}
              >
                <Typography variant="h6" align="center">
                  {description}
                </Typography>
                <Typography
                  variant="h2"
                  color="text.secondary"
                  sx={{ fontWeight: "bold" }}
                >
                  {count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
