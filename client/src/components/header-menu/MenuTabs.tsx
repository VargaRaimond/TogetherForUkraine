import * as React from "react";
import SmallScreenMenuTabs from "./SmallScreenMenuTabs";
import LargeScreenMenuTabs from "./LargeScreenMenuTabs";

// TODO: stop using this / update this
const pages = ["Home", "Get help", "Provide help", "Help offers"];

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
