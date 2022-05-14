import React, { ChangeEvent, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography } from "@mui/material";
import EditableField from "./EditableField";
import { IPerson } from "../../../api-interface/Person";
import LoadingScreen from "../../utils/LoadingScreen";

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
  const [personInfo, setPersonInfo] = useState<IPerson | undefined>(undefined);

  useEffect(() => {
    if (!user?.sub) return;
    fetch(`/api/person/${user.sub}/`)
      .then((res) => res.json())
      .then((dbPersonInfo) => setPersonInfo(dbPersonInfo));
  }, [user?.sub]);

  if (personInfo === undefined) {
    return <LoadingScreen />;
  }

  const handleValueSubmit = async (fieldName: string) => {
    await fetch(`api/person/${personInfo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        [fieldName]: personInfo[fieldName as keyof typeof personInfo],
      }),
    });
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPersonInfo({
      ...personInfo,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <EditableField
        label="Name"
        name="name"
        value={personInfo.name}
        handleValueChange={handleValueChange}
        handleValueSubmit={handleValueSubmit}
      />
      <EditableField
        label="Account e-mail"
        name=""
        value={user?.email || ""}
        inputType="email"
        disableEdit
      />
      <EditableField
        label="Contact e-mail"
        name="emailContact"
        value={personInfo.emailContact}
        inputType="email"
        handleValueChange={handleValueChange}
        handleValueSubmit={handleValueSubmit}
      />
      <EditableField
        label="Contact phone number"
        name="phoneNumber"
        value={personInfo.phoneNumber}
        inputType="tel"
        handleValueChange={handleValueChange}
        handleValueSubmit={handleValueSubmit}
      />
    </>
  );
};

export default ProfileForm;
