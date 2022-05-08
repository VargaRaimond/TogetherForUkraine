import React from "react";
import { Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import EditableField from "./EditableField";

// todo: delete this -> I'm keeping it only for auth debugging
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

  const personInfo = {
    name: "Bianca",
    email: "bianca@example.com",
    contactEmail: "bianca@example.com",
    phoneNumber: "0722 deja imi suna cunoscut",
  };

  return (
    <>
      <EditableField label="Name" initialValue={personInfo.name} />
      <EditableField
        label="Account e-mail"
        initialValue={user?.email || ""}
        inputType="email"
        disableEdit
      />
      <EditableField
        label="Contact e-mail"
        initialValue={personInfo.contactEmail}
        inputType="email"
      />
      <EditableField
        label="Contact phone number"
        initialValue={personInfo.phoneNumber}
        inputType="tel"
      />
    </>
  );
};

export default ProfileForm;
