import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AccountSettingsLoggedIn from "./AccountSettingsLoggedIn";
import AccountSettingsNotLoggedIn from "./AccountSettingsNotLoggedIn";

// Guest: Sign in, Register
// Admin: My profile, Sign out
// Refugee: My profile, Sign out
// Volunteer: My profile, My offers, Sign out

const AccountSettings = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? (
    <AccountSettingsLoggedIn />
  ) : (
    <AccountSettingsNotLoggedIn />
  );
};

export default AccountSettings;
