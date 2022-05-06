import { Auth0Provider } from "@auth0/auth0-react";

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN || "";
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || "";

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      audience="http://together-for-ukraine"
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
