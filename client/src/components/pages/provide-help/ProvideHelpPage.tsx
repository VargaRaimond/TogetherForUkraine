import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PageWrapper } from "../../utils/CommonComponents";
import ProvideHelpForm from "./ProvideHelpForm";
import ProvideHelpNotAuthenticated from "./ProvideHelpNotAuthenticated";
import LoadingScreen from "../../utils/LoadingScreen";

const ProvideHelpPage = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      {!isAuthenticated && <ProvideHelpNotAuthenticated />}
      <PageWrapper>
        <ProvideHelpForm />
      </PageWrapper>
    </div>
  );
};

export default ProvideHelpPage;
