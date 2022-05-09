import React from "react";
import { Routes, Route } from "react-router-dom";

import GetHelpPage from "./components/pages/get-help/GetHelpPage";
import ProvideHelpPage from "./components/pages/provide-help/ProvideHelpPage";
import HelpOffersPage from "./components/pages/help-offers/HelpOffers";
import ProfilePage from "./components/pages/profile-page/ProfilePage";
import RegisterPage from "./components/pages/RegisterPage";
import HomePage from "./components/pages/home-page/HomePage";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserRoles } from "./components/utils/authRoles";
import LoadingScreen from "./components/utils/LoadingScreen";
import MyOffersPage from "./components/pages/my-offers/MyOffersPage";

const AppContent = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingScreen />;
  }

  const hasIncompleteProfile =
    isAuthenticated && getUserRoles(user).length === 0;

  return (
    <>
      {hasIncompleteProfile ? (
        <RegisterPage />
      ) : (
        <Routes>
          {/*
          TODO delete this
          GET HELP:
            * get-offers -> /offers/
            * apply -> /usages/
            * delete offer -> DELETE /offers/:offerId

          PROVIDE HELP:
            * get-contact-info -> GET /person/:authId/contact (GET contact + personId)
            * submit-form -> POST /offers/

          HELP-OFFERS:
            * get-pending-offers -> GET /offers/pending
            * accept-offer -> PATCH /offers/:offerId/
            * decline-offer -> DELETE /offers/:offerId/

          PROFILE-PAGE:
          MY-OFFERS:

          */}
          <Route path="/get-help" element={<GetHelpPage />} />
          <Route path="/provide-help" element={<ProvideHelpPage />} />
          <Route path="/help-offers" element={<HelpOffersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-offers" element={<MyOffersPage />} />

          <Route path="/" element={<HomePage />} />
        </Routes>
      )}
    </>
  );
};

export default AppContent;