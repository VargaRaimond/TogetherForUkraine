import { Auth0Provider } from "@auth0/auth0-react";

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const domain =
    process.env.REACT_APP_AUTH0_DOMAIN || "dev-gq9lbjoe.us.auth0.com";
  const clientId =
    process.env.REACT_APP_AUTH0_CLIENT_ID || "aHKqjQqI3vhJRTI7qX68JxqRw5qQcxwC";
  const audience =
    process.env.REACT_APP_AUTH0_AUDIENCE || "http://together-for-ukraine";

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
