import * as React from "react";
import SmallScreenMenuTabs from "./SmallScreenMenuTabs";
import LargeScreenMenuTabs from "./LargeScreenMenuTabs";

export interface ILink {
  name: string;
  pathTo: string;
}

// TODO: Conditionally display / hide some tabs
const pages: ILink[] = [
  { name: "Home", pathTo: "/" },
  { name: "Get help", pathTo: "/get-help" },
  { name: "Provide help", pathTo: "/provide-help" },
  { name: "Help offers", pathTo: "/help-offers" },
];

const MenuTabs = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  return (
    <>
      <SmallScreenMenuTabs
        pages={pages}
        anchorElNav={anchorElNav}
        setAnchorElNav={setAnchorElNav}
      />
      <LargeScreenMenuTabs pages={pages} setAnchorElNav={setAnchorElNav} />
    </>
  );
};

export default MenuTabs;
