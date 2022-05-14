import React from "react";
import { Box, Button, Typography } from "@mui/material";

const ProvideHelpAfterSubmission = ({
  setIsSubmitted,
}: {
  setIsSubmitted: (isSubmitted: boolean) => void;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        marginTop: "50px",
        zIndex: 20,
        width: "100%",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        Thank you for submitting your offer!
      </Typography>
      <Typography variant="body1" fontWeight="bold">
        Your offer is now waiting to be approved.
      </Typography>
      <Box sx={{ flexDirection: "row", marginTop: "25px" }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            setIsSubmitted(false);
          }}
        >
          Add another offer
        </Button>
      </Box>
    </div>
  );
};

export default ProvideHelpAfterSubmission;
