import React, { useMemo, useState } from "react";
import GenericTable from "../../utils/table/GenericTable";
import { Button, styled } from "@mui/material";
import GetHelpTableToolbar from "./GetHelpTableToolbar";
import GetHelpModal from "./GetHelpModal";

const staticRows: IOfferEntry[] = [
  {
    name: "Help 1",
    description:
      "Volunteers are individuals who freely offer their time, labor, and expertise. Volunteers often work for schools or NGOs, where they typically receive training and report to designated senior staff. Completely free trial, no card required.",
    volunteer: "Eu",
    category: "Food",
    location: "Bacau",
    remainingOffers: 5,
  },
  {
    name: "Help 11",
    description: "",
    volunteer: "Eu",
    category: "Food",
    location: "Bacau",
    remainingOffers: 5,
  },
  {
    name: "Help 111",
    description: "",
    volunteer: "Eu",
    category: "Money",
    location: "Bacau",
    remainingOffers: 5,
  },
  {
    name: "Help 2",
    description: "",
    volunteer: "Tu",
    category: "Money",
    location: "Bucuresti",
    remainingOffers: 5,
  },
  {
    name: "Help 3",
    description: "",
    volunteer: "Noi",
    category: "Money",
    location: "Suceava",
    remainingOffers: 5,
  },
  {
    name: "Help 4",
    description: "",
    volunteer: "Voi",
    category: "Money",
    location: "Brasov",
    remainingOffers: 5,
  },
  {
    name: "Help 5",
    description: "",
    volunteer: "El",
    category: "Money",
    location: "Bucuresti",
    remainingOffers: 5,
  },
  {
    name: "Help 6",
    description: "",
    volunteer: "Ea",
    category: "Money",
    location: "Craiova",
    remainingOffers: 5,
  },
  {
    name: "Help 7",
    description: "",
    volunteer: "Ele",
    category: "Food",
    location: "Constanta",
    remainingOffers: 5,
  },
  {
    name: "Help 8",
    description: "",
    volunteer: "Ei",
    category: "Accomodation",
    location: "Cluj",
    remainingOffers: 5,
  },
];

const headCells = [
  { id: "name", label: "Name" },
  { id: "category", label: "Category" },
  { id: "location", label: "Location" },
  { id: "volunteer", label: "Volunteer" },
  { id: "seeMore" },
];

const PageWrapper = styled("div")(() => ({
  padding: "25px",
}));

const SeeMoreButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
}));

export interface IOfferEntry {
  name: string;
  description: string;
  volunteer: string;
  category: string;
  location: string;
  remainingOffers: number;
}

export interface IOfferTableEntry extends IOfferEntry {
  seeMore: JSX.Element;
}

const GetHelpPage = () => {
  const [modalOffer, setModalOffer] = useState<IOfferEntry | undefined>(
    undefined
  );

  const initialOffers = useMemo(
    () =>
      staticRows.map((offer) => ({
        ...offer,
        seeMore: (
          <SeeMoreButton onClick={() => setModalOffer(offer)}>
            See more
          </SeeMoreButton>
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
