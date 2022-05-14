import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PageWrapper } from "../../utils/CommonComponents";
import ProvideHelpForm from "./ProvideHelpForm";
import ProvideHelpNotAuthenticated from "./ProvideHelpNotAuthenticated";
import LoadingScreen from "../../utils/LoadingScreen";
import ProvideHelpAfterSubmission from "./ProvideHelpAfterSubmission";

const ProvideHelpPage = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      {!isAuthenticated && <ProvideHelpNotAuthenticated />}
      {isSubmitted && (
        <ProvideHelpAfterSubmission setIsSubmitted={setIsSubmitted} />
      )}

      <PageWrapper>
        <ProvideHelpForm
          disabled={!isAuthenticated || isSubmitted}
          setIsSubmitted={(value) => {
            setIsSubmitted(value);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </PageWrapper>
    </div>
  );
};

export default ProvideHelpPage;
