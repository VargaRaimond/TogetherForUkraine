import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PageWrapper } from "../../utils/CommonComponents";
import ProvideHelpForm from "./ProvideHelpForm";
import ProvideHelpNotAuthenticated from "./ProvideHelpNotAuthenticated";

const ProvideHelpPage = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {!isAuthenticated && <ProvideHelpNotAuthenticated />}
      <PageWrapper>
        <ProvideHelpForm isAuthenticated={isAuthenticated} />
      </PageWrapper>
    </div>
  );
};

export default ProvideHelpPage;
