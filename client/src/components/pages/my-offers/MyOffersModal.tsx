import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Backdrop,
  Box,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Edit, Check } from "@mui/icons-material";
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

const MyOffersModal = ({
  offer,
  handleClose: extHandleClose,
}: {
  offer?: IOffer;
  handleClose: () => void;
}) => {
  const open = useMemo(() => !!offer, [offer]);

  const [edit, setEdit] = useState(false);
  const [description, setDescription] = useState(offer?.description);
  const [error, setError] = useState("");

  useEffect(() => {
    setDescription(offer?.description);
  }, [offer?.description]);

  const handleClose = () => {
    setDescription(undefined);
    setEdit(false);
    extHandleClose();
  };

  const handleOfferUpdate = useCallback(() => {
    if (!offer || description === "") return;
    if (description === offer.description) {
      setEdit(false);
      return;
    }
    fetch(`/api/offers/${offer.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    })
      .then(() => {
        setEdit(false);
        if (offer && description) {
          offer.description = description;
        }
      })
      .catch((e) => {
        setError(e);
      });
  }, [description, offer]);

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
            {offer?.title}
          </Typography>

          <Typography variant="h6" sx={{ margin: "0 15px 0" }}>
            {offer?.location}
          </Typography>
        </div>

        <div style={{ display: "flex" }}>
          {edit ? (
            <>
              <TextField
                multiline
                value={description}
                sx={{ width: "100%" }}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                error={description === "" || error !== ""}
                helperText={description === "" ? "Description required" : error}
              />
              <Tooltip title="Edit description">
                <IconButton
                  color="success"
                  size="small"
                  sx={{ alignSelf: "center" }}
                  onClick={() => {
                    handleOfferUpdate();
                  }}
                >
                  <Check />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Typography variant="body1" sx={{ margin: "10px" }}>
                {description}
              </Typography>
              {!offer?.isApproved && (
                <Tooltip title="Edit description">
                  <IconButton
                    color="primary"
                    size="small"
                    sx={{ alignSelf: "center" }}
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
              )}
            </>
          )}
        </div>

        <Typography variant="body2" sx={{ mt: "5px", ml: "10px", mb: "5px" }}>
          <b>Total offers:</b> {offer?.maxRefugeesCount}
          <br />
          <b>Remaining offers: </b>
          {offer ? offer.maxRefugeesCount - offer.currentRefugeesCount : 0}
        </Typography>
      </Box>
    </Modal>
  );
};

export default MyOffersModal;
