import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Button } from "@mui/material";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();

  const [message, setMessage] = useState<string | undefined>(undefined);

  const callAPI = async () => {
    try {
      const response = await fetch("/api/public-message");
      const msg = await response.json();
      setMessage("public: " + msg.msg);
    } catch (err) {
      setMessage((err as { message?: string }).message);
    }
  };

  const callSecureAPI = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch("/api/private-message", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const msg = await response.json();
      setMessage("secure: " + msg.msg);
    } catch (err) {
      setMessage((err as { message?: string }).message);
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <div>
      <Button onClick={callAPI}>Public msg</Button>
      <br />
      <Button onClick={callSecureAPI}>Secure msg</Button>
      <br />
      {message}
      <br />
      <br />
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
      <div>{JSON.stringify(user, null, 2)}</div>
    </div>
  ) : (
    <>not auth</>
  );
};

export default Profile;
