import { useMemo } from "react";
import {
  Backdrop,
  Box,
  Button,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import { Delete, Send } from "@mui/icons-material";
import { IOfferEntry } from "./GetHelpPage";

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

const SendButton = styled(Button)(({ theme }) => ({
  margin: "5px",
  alignSelf: "end",
  width: "30%",
  backgroundColor: theme.palette.primary.light,
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  margin: "5px",
  alignSelf: "end",
  width: "30%",
  backgroundColor: theme.palette.error.main,
  "&.MuiButton-text": {
    color: "white",
    "&:hover": {
      color: "inherit",
    },
  },
}));

const GetHelpModal = ({
  handleClose,
  offer,
}: {
  handleClose: (open: boolean) => void;
  offer?: IOfferEntry;
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
        sx: { backgroundColor: "rgba(0,45,65,0.33)" },
        timeout: 500,
      }}
    >
      <Box sx={boxStyle}>
        <div style={{ display: "flex", alignItems: "end" }}>
          <Typography variant="h4" sx={{ margin: "10px 5px 0px 25px" }}>
            {offer?.name}
          </Typography>

          <Typography variant="h6" sx={{ margin: "0 15px 0" }}>
            {offer?.location}
          </Typography>
        </div>

        <Typography variant="body1" sx={{ margin: "10px" }}>
          {offer?.description}
        </Typography>

        <Typography variant="body2" sx={{ margin: "10px" }}>
          Remaining: {offer?.remainingOffers} offers
        </Typography>

        {/* TODO role: only for refugees */}
        {/* TODO onClick modal: Send */}
        <SendButton endIcon={<Send />}>Apply now</SendButton>

        {/* TODO role: only for admin */}
        {/* TODO onClick modal: Delete */}
        <DeleteButton startIcon={<Delete />}>Delete</DeleteButton>
      </Box>
    </Modal>
  );
};

export default GetHelpModal;
