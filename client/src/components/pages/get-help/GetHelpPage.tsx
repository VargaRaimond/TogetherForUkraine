import React, { useMemo, useState } from "react";
import GenericTable from "../../utils/table/GenericTable";
import { Button, styled } from "@mui/material";
import GetHelpTableToolbar from "./GetHelpTableToolbar";

const staticRows: IOfferEntry[] = [
  {
    name: "Help 1",
    volunteer: "Eu",
    category: "Food",
    location: "Bacau",
  },
  {
    name: "Help 11",
    volunteer: "Eu",
    category: "Food",
    location: "Bacau",
  },
  {
    name: "Help 111",
    volunteer: "Eu",
    category: "Money",
    location: "Bacau",
  },
  {
    name: "Help 2",
    volunteer: "Tu",
    category: "Money",
    location: "Bucuresti",
  },
  {
    name: "Help 3",
    volunteer: "Noi",
    category: "Money",
    location: "Suceava",
  },
  {
    name: "Help 4",
    volunteer: "Voi",
    category: "Money",
    location: "Brasov",
  },
  {
    name: "Help 5",
    volunteer: "El",
    category: "Money",
    location: "Bucuresti",
  },
  {
    name: "Help 6",
    volunteer: "Ea",
    category: "Money",
    location: "Craiova",
  },
  {
    name: "Help 7",
    volunteer: "Ele",
    category: "Food",
    location: "Constanta",
  },
  {
    name: "Help 8",
    volunteer: "Ei",
    category: "Accomodation",
    location: "Cluj",
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

interface IOfferEntry {
  name: string;
  volunteer: string;
  category: string;
  location: string;
}

export interface IOfferTableEntry extends IOfferEntry {
  seeMore: JSX.Element;
}

const GetHelpPage = () => {
  const initialRows = useMemo(() => {
    return staticRows.map((row) => ({
      ...row,
      seeMore: (
        <Button
          sx={{ backgroundColor: (theme) => theme.palette.primary.light }}
          // todo: open modal onClick={() => {}} with info based on current row
        >
          See more
        </Button>
      ),
    }));
  }, []);

  const [offers, setOffers] = useState(initialRows);

  return (
    <PageWrapper>
      <GetHelpTableToolbar offers={initialRows} setOffers={setOffers} />
      <GenericTable rows={offers} headCells={headCells} />
    </PageWrapper>
  );
};
export default GetHelpPage;
