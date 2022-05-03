import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";

const StatsGrid = () => {
  // TODO db: get this from somewhere
  const stats = {
    activeVolunteers: 5,
    helpedPeople: 1235,
    activeOffers: 125,
    totalOffers: 12133,
  };

  const getFormattedCount = (count: number) => {
    if (count > 10000) {
      return `${(count / 1000).toFixed(2)}k`;
    }
    return count;
  };

  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={{ xs: 1, sm: 1, md: 2 }}
      justifyContent={"center"}
    >
      {[
        { description: "Active Volunteers", count: stats.activeVolunteers },
        { description: "People we've helped", count: stats.helpedPeople },
        { description: "Active Offers", count: stats.activeOffers },
        { description: "Total Offers", count: stats.totalOffers },
      ].map(({ description, count }) => (
        <Grid item xs={4.75} md={2.8}>
          <Card
            elevation={5}
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
                {getFormattedCount(count)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsGrid;
