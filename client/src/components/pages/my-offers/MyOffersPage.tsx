import React, { useMemo, useState } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import { IOfferEntry } from "../get-help/GetHelpPage";
import { PageWrapper } from "../../utils/CommonComponents";
import GenericTable from "../../utils/table/GenericTable";
import { mockOffers } from "../../0-mock-data/mock-offers";
import MyOffersModal from "./MyOffersModal";
import MyOffersDeleteConfirmationModal from "./MyOffersDeleteConfirmationModal";

export interface IMyOffer extends IOfferEntry {
  isAccepted: boolean;
  totalOffers: number;
}

const staticRows: IMyOffer[] = mockOffers.map((offer) => ({
  ...offer,
  totalOffers: 5,
  isAccepted: Math.floor(Math.random() * 5) % 2 === 0,
}));

const headCells = [
  { id: "name", label: "Name" },
  { id: "category", label: "Category" },
  { id: "location", label: "Location" },
  { id: "status", label: "Status" },
  { id: "actions" },
];

const MyOffersPage = () => {
  const [modalOffer, setModalOffer] = useState<IMyOffer | undefined>(undefined);

  const [offerToBeDeleted, setOfferToBeDeleted] = useState<
    IMyOffer | undefined
  >(undefined);

  const initialOffers = useMemo(() => {
    // TODO db: fetch from db
    return staticRows.map((offer) => ({
      ...offer,
      status: offer.isAccepted ? "Accepted" : "Pending...",
      actions: (
        <>
          <Tooltip title="See more">
            <IconButton color="primary" onClick={() => setModalOffer(offer)}>
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => setOfferToBeDeleted(offer)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </>
      ),
    }));
  }, []);

  const [offers, setOffers] = useState<IMyOffer[]>(initialOffers);

  const handleDelete = (offerToBeRemoved: IMyOffer) => {
    setOffers(offers.filter((offer) => offer.name !== offerToBeRemoved.name));
    setOfferToBeDeleted(undefined);
  };

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
