import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { IOfferWithVolunteer } from "../../../api-interface/Offers";
import GenericTable from "../../utils/table/GenericTable";
import GetHelpTableToolbar from "./GetHelpTableToolbar";
import GetHelpModal from "./GetHelpModal";
import { PageWrapper } from "../../utils/CommonComponents";
import LoadingScreen from "../../utils/LoadingScreen";
import ErrorScreen from "../../utils/ErrorScreen";

// TODO: remove
// import { mockOffers } from "../../0-mock-data/mock-offers";
// const staticRows: IOfferEntry[] = mockOffers;

// TODO: this will be removed
export interface IOfferEntry {
  id: string;
  name: string;
  description: string;
  volunteer: string;
  category: string;
  location: string;
  remainingOffers: number;
}

export interface IOfferTableEntry extends IOfferWithVolunteer {
  seeMore: JSX.Element;
}

const headCells = [
  { id: "title", label: "Title" },
  { id: "category", label: "Category" },
  { id: "location", label: "Location" },
  { id: "volunteerName", label: "Volunteer" },
  { id: "seeMore" },
];

const GetHelpPage = () => {
  const [offers, setOffers] = useState<IOfferTableEntry[]>([]);
  const [error, setError] = useState(undefined);
  const [initialOffers, setInitialOffers] = useState<
    IOfferTableEntry[] | undefined
  >(undefined);
  const [modalOffer, setModalOffer] = useState<IOfferWithVolunteer | undefined>(
    undefined
  );

  useEffect(() => {
    fetch("/api/offers")
      .then((response) => response.json())
      .then((responseOffers: IOfferWithVolunteer[]) => {
        const completeOfferRows = responseOffers.map((offer) => ({
          ...offer,
          // TODO: should not receive volunteerName if it's anonymous
          volunteerName: offer.isAnonymous ? "anonymous" : offer.volunteerName,
          seeMore: (
            <Button onClick={() => setModalOffer(offer)} variant="contained">
              See more
            </Button>
          ),
        }));

        setOffers(completeOfferRows);
        setInitialOffers(completeOfferRows);
      })
      .catch((e) => setError(e));
  }, []);

  if (initialOffers === undefined) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

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
