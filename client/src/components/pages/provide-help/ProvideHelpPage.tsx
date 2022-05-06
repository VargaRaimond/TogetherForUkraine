import React from "react";
import { PageWrapper } from "../../utils/CommonComponents";
import ProvideHelpForm from "./ProvideHelpForm";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Downloading } from "@mui/icons-material";

const ProvideHelpPage = () => {
  // TODO auth: if the user is authenticated, display "Join our community" page
  return (
    <PageWrapper>
      <ProvideHelpForm />
    </PageWrapper>
  );
};

export default withAuthenticationRequired(ProvideHelpPage, {
  onRedirecting: () => <Downloading />,
});
// export default ProvideHelpPage;
