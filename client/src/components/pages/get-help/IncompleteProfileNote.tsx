import { useNavigate } from "react-router-dom";
import { Link, Typography } from "@mui/material";

const IncompleteProfileNote = () => {
  const navigate = useNavigate();
  const incompleteProfileNoteParts = [
    "* To apply for this offer you need to have a complete profile. Click ",
    "here",
    " to go to your profile",
  ];

  return (
    <Typography
      color="error"
      variant="caption"
      fontStyle="italic"
      fontSize="x-small"
    >
      {incompleteProfileNoteParts[0]}
      <Link
        component="button"
        color="error"
        variant="caption"
        fontStyle="italic"
        fontSize="x-small"
        onClick={() => {
          navigate("/profile", { replace: true });
        }}
      >
        {incompleteProfileNoteParts[1]}
      </Link>
      {incompleteProfileNoteParts[2]}
    </Typography>
  );
};
export default IncompleteProfileNote;
