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
import { getUserRolesObject } from "../../utils/authRoles";
import { useAuth0 } from "@auth0/auth0-react";
import IncompleteProfileNote from "./IncompleteProfileNote";

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
  width: "40%",
}));

const GetHelpModal = ({
  handleClose,
  offer,
}: {
  handleClose: (open: boolean) => void;
  offer?: IOfferEntry;
}) => {
  const { user } = useAuth0();
  const open = useMemo(() => !!offer, [offer]);

  const { isAdmin, isRefugee } = useMemo(() => {
    return getUserRolesObject(user);
  }, [user]);

  // TODO: actually check if the profile is complete or not
  const hasIncompleteProfile = true;

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

        {/* TODO onClick modal: Send */}
        {isRefugee && (
          <>
            <StyledButton
              endIcon={<Send />}
              variant="contained"
              disabled={hasIncompleteProfile}
            >
              Apply now
            </StyledButton>
            {hasIncompleteProfile && <IncompleteProfileNote />}
          </>
        )}

        {/* TODO onClick modal: Delete */}
        {isAdmin && (
          <StyledButton
            startIcon={<Delete />}
            variant="contained"
            color="error"
          >
            Delete
          </StyledButton>
        )}
      </Box>
    </Modal>
  );
};

export default GetHelpModal;
