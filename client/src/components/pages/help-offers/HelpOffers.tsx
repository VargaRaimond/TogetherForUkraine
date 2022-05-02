import React, { useMemo, useState } from "react";
import { PageWrapper } from "../../utils/CommonComponents";
import { IOfferEntry } from "../get-help/GetHelpPage";
import { Button, Toolbar } from "@mui/material";
import GenericTable from "../../utils/table/GenericTable";
import HelpOffersModal from "./HelpOffersModal";
import { mockOffers } from "../../0-mock-data/mock-offers";

export interface IHelpOffers extends IOfferEntry {
  date: string;
}

const staticRows: IHelpOffers[] = mockOffers;

const headCells = [
  { id: "date", label: "Date" },
  { id: "name", label: "Name" },
  { id: "category", label: "Category" },
  { id: "location", label: "Location" },
  { id: "volunteer", label: "Volunteer" },
  { id: "seeMore" },
];

const HelpOffersPage = () => {
  const [modalOffer, setModalOffer] = useState<IHelpOffers | undefined>(
    undefined
  );

  const initialOffers = useMemo(
    () =>
      staticRows.map((offer) => ({
        ...offer,
        seeMore: (
          <Button onClick={() => setModalOffer(offer)} variant={"contained"}>
            See more
          </Button>
        ),
      })),
    []
  );

  const [offers, setOffers] = useState(initialOffers);

  const handleOfferAccept = (offer: IHelpOffers) => {
    // TODO db: handle accept
    setOffers(offers.filter((o) => o.name !== offer.name));
    console.log("Accept", offer);
  };

  const handleOfferDecline = (offer: IHelpOffers) => {
    // TODO db: handle decline
    setOffers(offers.filter((o) => o.name !== offer.name));
    console.log("Decline", offer);
  };

  return (
    <PageWrapper>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        Pending offers: {offers.length}
      </Toolbar>
      <GenericTable rows={offers} headCells={headCells} />
      <HelpOffersModal
        offer={modalOffer}
        handleClose={() => setModalOffer(undefined)}
        handleAccept={handleOfferAccept}
        handleDecline={handleOfferDecline}
      />
    </PageWrapper>
  );
};

export default HelpOffersPage;
