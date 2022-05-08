import React, { ChangeEvent, useState } from "react";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { Check, Edit } from "@mui/icons-material";

const EditableField = ({
  label,
  initialValue,
  disableEdit = false,
  inputType = "text",
}: {
  label: string;
  initialValue: string;
  disableEdit?: boolean;
  inputType?: string;
}) => {
  const [edit, setEdit] = useState(false);
  const [fieldValue, setFieldValue] = useState(initialValue);

  const handleEditClick = () => setEdit(true);

  const handleValueSubmit = () => {
    if (fieldValue !== "") setEdit(false);
    // todo db: UPDATE field if (fieldValue !== initialValue)
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
  };

  const helperText = fieldValue === "" ? `${label} required` : "";

  return (
    <div style={{ display: "flex", margin: "10px" }}>
      <TextField
        label={label}
        value={fieldValue}
        onChange={handleValueChange}
        error={fieldValue === ""}
        helperText={helperText}
        sx={{ width: "100%" }}
        disabled={!edit}
        type={inputType}
      />
      <Tooltip title={edit ? `Submit ${label}` : `Edit ${label}`}>
        <IconButton
          disabled={disableEdit}
          size="small"
          color={edit ? "success" : "primary"}
          onClick={edit ? handleValueSubmit : handleEditClick}
        >
          {edit ? <Check /> : <Edit />}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default EditableField;
