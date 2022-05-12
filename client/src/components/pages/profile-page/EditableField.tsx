import React, { ChangeEvent, useState } from "react";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { Check, Edit } from "@mui/icons-material";

const EditableField = ({
  label,
  name,
  value,
  disableEdit = false,
  inputType = "text",
  handleValueChange,
  handleValueSubmit,
}: {
  label: string;
  name: string;
  value: string;
  disableEdit?: boolean;
  inputType?: string;
  handleValueChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleValueSubmit?: (name: string) => void;
}) => {
  const [edit, setEdit] = useState(false);

  const handleEditClick = () => setEdit(true);

  const handleSubmit = () => {
    if (value !== "") setEdit(false);
    if (handleValueSubmit) handleValueSubmit(name);
  };

  const helperText = value === "" ? `${label} required` : "";

  return (
    <div style={{ display: "flex", margin: "10px" }}>
      <TextField
        label={label}
        name={name}
        value={value}
        onChange={handleValueChange}
        error={value === ""}
        helperText={helperText}
        sx={{ width: "100%" }}
        disabled={!edit}
        type={inputType}
      />
      {disableEdit ? (
        <IconButton disabled size="small">
          <Edit />
        </IconButton>
      ) : (
        <Tooltip title={edit ? `Submit ${label}` : `Edit ${label}`}>
          <IconButton
            size="small"
            color={edit ? "success" : "primary"}
            onClick={edit ? handleSubmit : handleEditClick}
          >
            {edit ? <Check /> : <Edit />}
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default EditableField;
