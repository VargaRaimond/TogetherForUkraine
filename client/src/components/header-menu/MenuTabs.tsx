import * as React from "react";
import { useMemo } from "react";
import SmallScreenMenuTabs from "./SmallScreenMenuTabs";
import LargeScreenMenuTabs from "./LargeScreenMenuTabs";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserRoles, UserRoles } from "../utils/authRoles";

export interface ILink {
  name: string;
  pathTo: string;
  roles?: UserRoles[]; // If it's undefined, it can be seen by any role
}

const allPages: ILink[] = [
  { name: "Home", pathTo: "/" },
  { name: "Get help", pathTo: "/get-help" },
  {
    name: "Provide help",
    pathTo: "/provide-help",
    roles: [UserRoles.Guest, UserRoles.Admin, UserRoles.Volunteer],
  },
  {
    name: "Help offers",
    pathTo: "/help-offers",
    roles: [UserRoles.Admin],
  },
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
