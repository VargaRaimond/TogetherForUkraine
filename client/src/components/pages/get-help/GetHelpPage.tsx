import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { IOfferWithVolunteerName } from "../../../api-interface/Offers";
import GenericTable from "../../utils/table/GenericTable";
import GetHelpTableToolbar from "./GetHelpTableToolbar";
import GetHelpModal from "./GetHelpModal";
import { PageWrapper } from "../../utils/CommonComponents";
import LoadingScreen from "../../utils/LoadingScreen";
import ErrorScreen from "../../utils/ErrorScreen";
import { IPerson } from "../../../api-interface/Person";

export interface IOfferTableEntry extends IOfferWithVolunteerName {
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
  const [modalOffer, setModalOffer] = useState<
    IOfferWithVolunteerName | undefined
  >(undefined);

  const { user } = useAuth0();
  const [hasIncompleteProfile, setHasIncompleteProfile] = useState(true);

  useEffect(() => {
    fetch("/api/offers")
      .then((response) => response.json())
      .then((dbOffers: IOfferWithVolunteerName[]) => {
        const completeOfferRows = dbOffers
          .filter(
            (offer) => offer.maxRefugeesCount > offer.currentRefugeesCount
          )
          .map((offer) => ({
            ...offer,
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

  useEffect(() => {
    if (!user?.sub) return;
    fetch(`/api/person/${user.sub}`)
      .then((res) => res.json())
      .then((person: IPerson) => {
        setHasIncompleteProfile(
          !Boolean(person.name && person.emailContact && person.phoneNumber)
        );
      });
  }, [user?.sub]);

  const sendApplyNowEmail = (offer: IOfferWithVolunteerName) => {
    fetch(`/api/mail-queue/new-application`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refugeeId: user?.sub,
        volunteerId: offer.personId,
        offerTitle: offer.title,
        offerDescription: offer.description,
        isVolunteerAnonymous: offer.isAnonymous,
        preferredContactMethod: offer.preferredContactMethod,
      }),
    }).catch((e) => setError(e));
  };

  const handleApplyNow = (offer?: IOfferWithVolunteerName) => {
    if (!offer) return;

    fetch(`/api/usages/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ personId: user?.sub, offerId: offer?.id }),
    }).then(() => {
      if (offer) {
        offer.currentRefugeesCount = offer.currentRefugeesCount + 1;
        if (offer.currentRefugeesCount >= offer.maxRefugeesCount) {
          setInitialOffers(initialOffers?.filter((o) => o.id !== offer.id));
          setOffers(offers.filter((o) => o.id !== offer.id));
        }
      }
      sendApplyNowEmail(offer);
    });
  };

  const sendDeleteEmail = (offer: IOfferWithVolunteerName) => {
    fetch(`/api/mail-queue/offer-removed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        volunteerId: offer.personId,
        volunteerName: offer.volunteerName,
        offerTitle: offer.title,
      }),
    }).catch((e) => setError(e));
  };

  const handleDelete = (offer?: IOfferWithVolunteerName) => {
    if (!offer) return;

    fetch(`/api/offers/${offer.id}`, { method: "DELETE" })
      .then(() => sendDeleteEmail(offer))
      .catch((e) => setError(e));
    setInitialOffers(initialOffers?.filter((o) => o.id !== offer.id));
    setOffers(offers.filter((o) => o.id !== offer.id));
  };

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
        hasIncompleteProfile={hasIncompleteProfile}
        handleClose={() => setModalOffer(undefined)}
        handleDelete={handleDelete}
        handleApplyNow={handleApplyNow}
      />
    </PageWrapper>
  );
};

export default GetHelpPage;
