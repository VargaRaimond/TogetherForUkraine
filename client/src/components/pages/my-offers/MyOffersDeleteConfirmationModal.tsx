import React, { useMemo } from "react";
import {
  Backdrop,
  Box,
  Button,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import { Cancel, Delete } from "@mui/icons-material";
import { IOffer } from "../../../api-interface/Offers";

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 440,
  width: "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const StyledButton = styled(Button)(() => ({
  margin: "5px",
  width: "30%",
}));

const MyOffersDeleteConfirmationModal = ({
  offer,
  handleClose,
  handleDelete,
}: {
  offer?: IOffer;
  handleClose: () => void;
  handleDelete: (offer: IOffer) => void;
}) => {
  const open = useMemo(() => !!offer, [offer]);

  return (
    <Modal
      aria-labelledby="offer-modal"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        sx: { backgroundColor: "rgba(65,1,1,0.34)" },
        timeout: 500,
      }}
    >
      <Box sx={boxStyle}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ margin: "10px 5px 0px 25px" }}
        >
          {offer?.title}
        </Typography>
        <Typography variant="h6" sx={{ margin: "10px" }}>
          Are you sure you want to delete this offer?
        </Typography>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <StyledButton
            startIcon={<Delete />}
            variant="contained"
            color="error"
            onClick={() => offer && handleDelete(offer)}
          >
            Delete
          </StyledButton>
          <StyledButton
            startIcon={<Cancel />}
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </StyledButton>
        </div>
      </Box>
    </Modal>
  );
};

export default MyOffersDeleteConfirmationModal;
