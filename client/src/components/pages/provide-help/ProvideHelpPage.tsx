import React from "react";
import { PageWrapper } from "../../utils/CommonComponents";
import ProvideHelpForm from "./ProvideHelpForm";

const ProvideHelpPage = () => {
  // TODO auth: if the user is authenticated, display "Join our community" page
  return (
    <PageWrapper>
      <ProvideHelpForm />
    </PageWrapper>
  );
};

export default ProvideHelpPage;
