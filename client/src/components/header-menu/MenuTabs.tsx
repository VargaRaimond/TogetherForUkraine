import * as React from "react";
import SmallScreenMenuTabs from "./SmallScreenMenuTabs";
import LargeScreenMenuTabs from "./LargeScreenMenuTabs";
import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import { getUserRoles } from "../auth/helpers";

export interface ILink {
  name: string;
  pathTo: string;
  roles?: string[]; // If it's undefined, it can be seen by any role
}

const allPages: ILink[] = [
  { name: "Home", pathTo: "/" },
  { name: "Get help", pathTo: "/get-help" },
  {
    name: "Provide help",
    pathTo: "/provide-help",
    roles: ["guest", "admin", "volunteer"],
  },
  { name: "Help offers", pathTo: "/help-offers", roles: ["admin"] },
];

const MenuTabs = () => {
  const { user } = useAuth0();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const pages = useMemo(() => {
    const userRoles = getUserRoles(user);

    return allPages.filter(
      ({ roles: pageRoles }) =>
        pageRoles === undefined ||
        pageRoles.some((pageRole) =>
          userRoles.some((userRole) => userRole === pageRole)
        )
    );
  }, [user]);

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
