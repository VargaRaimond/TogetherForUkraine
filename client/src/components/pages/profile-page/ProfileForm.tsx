import React from "react";
import { TextField, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

export const RemovableJson = () => {
  const { user } = useAuth0();

  return (
    <div style={{ marginTop: "100px" }}>
      <Typography color="error" fontWeight="bold">
        TODO remove this JSON
      </Typography>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

const ProfileForm = () => {
  const { user } = useAuth0();

  return (
    <>
      <TextField
        name="name"
        label="Name"
        defaultValue={user?.name} // TODO: replace with data from db
        disabled={true}
        margin={"normal"}
      />
      <TextField
        name="email"
        label="Name"
        defaultValue={user?.email} // TODO: replace with data from db
        disabled={true}
        margin={"normal"}
      />

      <TextField
        name="phoneNumber"
        label="Phone number"
        defaultValue={user?.name} // TODO: replace with data from db
        type="tel"
        disabled={true}
        margin={"normal"}
      />

      <TextField
        name="contactEmail"
        label="Contact email"
        defaultValue={user?.email} // TODO: replace with data from db
        type="tel"
        disabled={true}
        margin={"normal"}
      />
    </>
  );
};

export default ProfileForm;
