import React, { useMemo, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import { IOfferEntry } from "../get-help/GetHelpPage";
import { PageWrapper } from "../../utils/CommonComponents";
import GenericTable from "../../utils/table/GenericTable";
import { mockOffers } from "../../0-mock-data/mock-offers";
import HelpOffersModal from "./MyOffersModal";

export interface IMyOffers extends IOfferEntry {
  isAccepted: boolean;
  totalOffers: number;
}

const staticRows: IMyOffers[] = mockOffers.map((offer) => ({
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
  const [modalOffer, setModalOffer] = useState<IMyOffers | undefined>(
    undefined
  );

  const offers = useMemo(
    () =>
      staticRows.map((offer) => ({
        ...offer,
        status: offer.isAccepted ? "Accepted" : "Pending...",
        actions: (
          <>
            <Tooltip title="See more">
              <IconButton color="primary" onClick={() => setModalOffer(offer)}>
                <Visibility />
              </IconButton>
            </Tooltip>
            {/* todo: add onClick action */}
            <Tooltip title="Delete">
              <IconButton color="error">
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        ),
      })),
    []
  );

  return (
    <PageWrapper>
      <GenericTable rows={offers} headCells={headCells} />
      <HelpOffersModal
        offer={modalOffer}
        handleClose={() => setModalOffer(undefined)}
      />
    </PageWrapper>
  );
};

export default MyOffersPage;
