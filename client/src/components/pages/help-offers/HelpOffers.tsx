import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { PageWrapper } from "../../utils/CommonComponents";
import GenericTable from "../../utils/table/GenericTable";
import HelpOffersModal from "./HelpOffersModal";
import { IOfferWithVolunteer } from "../../../api-interface/Offers";
import LoadingScreen from "../../utils/LoadingScreen";
import ErrorScreen from "../../utils/ErrorScreen";

const headCells = [
  { id: "createdAt", label: "Date" },
  { id: "title", label: "Title" },
  { id: "category", label: "Category" },
  { id: "location", label: "Location" },
  { id: "volunteerName", label: "Volunteer" },
  { id: "seeMore" },
];

const HelpOffersPage = () => {
  const [error, setError] = useState("");
  const [offers, setOffers] = useState<IOfferWithVolunteer[] | undefined>(
    undefined
  );
  const [modalOffer, setModalOffer] = useState<IOfferWithVolunteer | undefined>(
    undefined
  );

  useEffect(() => {
    fetch("/api/offers/pending")
      .then((response) => response.json())
      .then((dbOffers: IOfferWithVolunteer[]) => {
        const completeOfferRows = dbOffers.map((offer) => ({
          ...offer,
          createdAt: new Date(offer.createdAt),
          seeMore: (
            <Button onClick={() => setModalOffer(offer)} variant="contained">
              See more
            </Button>
          ),
        }));

        setOffers(completeOfferRows);
      })
      .catch((e) => setError(e));
  }, []);

  if (offers === undefined) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  const sendEmail = (path: string, offer: IOfferWithVolunteer) => {
    fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        volunteerContactEmail: offer.volunteerContactEmail,
        volunteerName: offer.volunteerName,
        offerTitle: offer.title,
      }),
    }).catch((e) => setError(e));
  };

  const handleOfferAccept = (offer: IOfferWithVolunteer) => {
    fetch(`/api/offers/${offer.id}/accept`, { method: "PUT" })
      .then(() => sendEmail(`/api/mail-queue/offer-accepted`, offer))
      .catch((e) => setError(e));
    setOffers(offers.filter((o) => o.id !== offer.id));
  };

  const handleOfferDecline = (offer: IOfferWithVolunteer) => {
    fetch(`/api/offers/${offer.id}`, { method: "DELETE" })
      .then(() => sendEmail(`/api/mail-queue/offer-declined`, offer))
      .catch((e) => setError(e));
    setOffers(offers.filter((o) => o.id !== offer.id));
  };

  return (
    <PageWrapper>
      {/* todo: style this */}
      <Typography sx={{ pb: "10px", pl: "10px" }}>
        Pending offers: {offers.length}
      </Typography>
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
