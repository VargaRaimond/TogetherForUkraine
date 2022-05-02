import { useMemo } from "react";
import {
  Backdrop,
  Box,
  Button,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import { Cancel, Check } from "@mui/icons-material";
import { IHelpOffers } from "./HelpOffers";

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
  alignSelf: "end",
  width: "30%",
}));

const HelpOffersModal = ({
  offer,
  handleClose,
  handleAccept,
  handleDecline,
}: {
  offer?: IHelpOffers;
  handleClose: () => void;
  handleAccept: (offer: IHelpOffers) => void;
  handleDecline: (offer: IHelpOffers) => void;
}) => {
  const open = useMemo(() => !!offer, [offer]);

  const onAcceptClick = () => {
    if (offer !== undefined) handleAccept(offer);
    handleClose();
  };
  const onDeclineClick = () => {
    if (offer !== undefined) handleDecline(offer);
    handleClose();
  };

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

        <StyledButton
          startIcon={<Check />}
          variant="contained"
          onClick={onAcceptClick}
        >
          Accept
        </StyledButton>

        <StyledButton
          startIcon={<Cancel />}
          variant="contained"
          color={"error"}
          onClick={onDeclineClick}
        >
          Decline
        </StyledButton>
      </Box>
    </Modal>
  );
};

export default HelpOffersModal;
