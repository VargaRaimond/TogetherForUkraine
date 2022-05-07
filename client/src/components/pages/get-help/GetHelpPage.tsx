import React, { useMemo, useState } from "react";
import GenericTable from "../../utils/table/GenericTable";
import { Button } from "@mui/material";
import GetHelpTableToolbar from "./GetHelpTableToolbar";
import GetHelpModal from "./GetHelpModal";
import { PageWrapper } from "../../utils/CommonComponents";
import { mockOffers } from "../../0-mock-data/mock-offers";

export interface IOfferEntry {
  name: string;
  description: string;
  volunteer: string;
  category: string;
  location: string;
  remainingOffers: number;
}

const staticRows: IOfferEntry[] = mockOffers;

const headCells = [
  { id: "name", label: "Name" },
  { id: "category", label: "Category" },
  { id: "location", label: "Location" },
  { id: "volunteer", label: "Volunteer" },
  { id: "seeMore" },
];

export interface IOfferTableEntry extends IOfferEntry {
  seeMore: JSX.Element;
}

const GetHelpPage = () => {
  const [modalOffer, setModalOffer] = useState<IOfferEntry | undefined>(
    undefined
  );

  const initialOffers = useMemo(
    () =>
      // TODO db: fetch offers
      staticRows.map((offer) => ({
        ...offer,
        seeMore: (
          <Button onClick={() => setModalOffer(offer)} variant="contained">
            See more
          </Button>
        ),
      })),
    []
  );

  const [offers, setOffers] = useState(initialOffers);

  return (
    <PageWrapper>
      <GetHelpTableToolbar offers={initialOffers} setOffers={setOffers} />
      <GenericTable rows={offers} headCells={headCells} />
      <GetHelpModal
        offer={modalOffer}
        handleClose={() => setModalOffer(undefined)}
      />
    </PageWrapper>
  );
};
export default GetHelpPage;
