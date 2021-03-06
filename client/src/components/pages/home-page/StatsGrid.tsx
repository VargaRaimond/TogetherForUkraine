import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import CountUp from "react-countup";

const StatsGrid = () => {
  const [stats, setStats] = useState({
    activeVolunteers: 0,
    helpedPeople: 0,
    activeOffers: 0,
    totalOffers: 0,
  });

  useEffect(() => {
    fetch("/api/stats/")
      .then((res) => res.json())
      .then((dbStats) => setStats(dbStats));
  }, []);

  const getFormattedCount = (count: number) => {
    if (count >= 10000) {
      return `${(count / 1000).toFixed(2)}k`;
    }
    return `${count}`;
  };

  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={{ xs: 1, sm: 1, md: 2 }}
      justifyContent="center"
    >
      {[
        { description: "Active Volunteers", count: stats.activeVolunteers },
        { description: "People we've helped", count: stats.helpedPeople },
        { description: "Active Offers", count: stats.activeOffers },
        { description: "Total Offers", count: stats.totalOffers },
      ].map(({ description, count }) => (
        <Grid item xs={4.75} md={2.8} key={description}>
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
              <CountUp
                start={0}
                end={count}
                delay={0}
                duration={1.0}
                formattingFn={getFormattedCount}
              >
                {({ countUpRef }) => (
                  <Typography
                    variant="h2"
                    color="text.secondary"
                    sx={{ fontWeight: "bold" }}
                    ref={countUpRef}
                  />
                )}
              </CountUp>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsGrid;
