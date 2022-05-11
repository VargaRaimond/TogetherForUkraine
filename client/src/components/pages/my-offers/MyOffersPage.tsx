import React, { useCallback, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import { IOffer } from "../../../api-interface/Offers";
import { PageWrapper } from "../../utils/CommonComponents";
import GenericTable from "../../utils/table/GenericTable";
import MyOffersModal from "./MyOffersModal";
import MyOffersDeleteConfirmationModal from "./MyOffersDeleteConfirmationModal";
import LoadingScreen from "../../utils/LoadingScreen";
import ErrorScreen from "../../utils/ErrorScreen";

const headCells = [
  { id: "title", label: "Title" },
  { id: "category", label: "Category" },
  { id: "location", label: "Location" },
  { id: "status", label: "Status" },
  { id: "actions" },
];

const MyOfferActions = ({
  offer,
  setModalOffer,
  setOfferToBeDeleted,
}: {
  // TODO: -> any
  offer: any;
  setModalOffer: any;
  setOfferToBeDeleted: any;
}) => {
  return (
    <>
      <Tooltip title="See more">
        <IconButton color="primary" onClick={() => setModalOffer(offer)}>
          <Visibility />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton color="error" onClick={() => setOfferToBeDeleted(offer)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </>
  );
};

const MyOffersPage = () => {
  const { user } = useAuth0();

  const [loading, setLoading] = useState<boolean>(true);

  const [offers, setOffers] = useState<IOffer[]>([]);
  const [error, setError] = useState(undefined);

  const [modalOffer, setModalOffer] = useState<IOffer | undefined>(undefined);
  const [offerToBeDeleted, setOfferToBeDeleted] = useState<IOffer | undefined>(
    undefined
  );

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`/api/offers/${user?.sub}`)
      .then((response) => response.json())
      .then((dbOffers: IOffer[]) => {
        const completeOfferRows = dbOffers.map((offer) => ({
          ...offer,
          status: offer.isApproved ? "Accepted" : "Pending...",
          actions: (
            <MyOfferActions
              offer={offer}
              setModalOffer={setModalOffer}
              setOfferToBeDeleted={setOfferToBeDeleted}
            />
          ),
        }));

        setLoading(false);
        setOffers(completeOfferRows);
      })
      .catch((e) => {
        setLoading(false);
        setError(e);
      });
  }, [user]);

  const handleDelete = useCallback(
    (offerToBeRemoved: IOffer) => {
      setLoading(true);

      fetch(`/api/offers/${offerToBeRemoved.id}`, { method: "DELETE" })
        .then(() => {
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
        });

      setOffers(
        (offers ?? []).filter((offer) => offer.id !== offerToBeRemoved.id)
      );
      setOfferToBeDeleted(undefined);
    },
    [offers]
  );

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <PageWrapper>
      <Typography>Your active and pending offers:</Typography>
      <GenericTable rows={offers} headCells={headCells} />
      <MyOffersModal
        offer={modalOffer}
        handleClose={() => setModalOffer(undefined)}
      />
      <MyOffersDeleteConfirmationModal
        offer={offerToBeDeleted}
        handleClose={() => setOfferToBeDeleted(undefined)}
        handleDelete={handleDelete}
      />
    </PageWrapper>
  );
};

export default MyOffersPage;
