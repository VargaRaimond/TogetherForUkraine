import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  TextField,
  FormGroup,
  FormLabel,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
  Typography,
} from "@mui/material";

interface IProvideHelpData {
  title: string;
  description: string;
  category: string;
  location: string;
  maxRefugeesCount: number | string;
  preferredContactMethod: string;
  isAnonymous: boolean;
}

const ProvideHelpForm = () => {
  const { user, isAuthenticated } = useAuth0();
  const [error, setError] = useState("");
  const [state, setState] = useState<IProvideHelpData>({
    title: "",
    description: "",
    category: "",
    location: "",
    maxRefugeesCount: "",
    preferredContactMethod: "",
    isAnonymous: false,
  });
  const [contactData, setContactData] = useState({
    phoneNumber: "",
    emailContact: "",
  });

  useEffect(() => {
    if (!user?.sub) return;
    fetch(`/api/person/${user?.sub}/contact`)
      .then((res) => res.json())
      .then((contact) => setContactData(contact));
  }, [user?.sub]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    if (!isAuthenticated) {
      return;
    }
    if (!user) {
      setError("ERR: No user");
      return;
    }
    fetch("/api/offers/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...state, personId: user.sub }),
    })
      .then()
      .catch((err) => setError(err));

    // TODO submit: confirmation page
    event.preventDefault();
    return false;
  };

  return (
    <div style={!isAuthenticated ? { filter: "blur(5px)" } : {}}>
      <FormControl
        component="form"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: { xs: "center", md: "start" },
          pl: { xs: 0, md: "20%" },
        }}
        disabled={!isAuthenticated}
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            maxWidth: "500px",
          }}
        >
          <FormLabel
            sx={{
              fontSize: "x-large",
              fontWeight: "bold",
              color: "text.primary",
            }}
          >
            How can you help us?
          </FormLabel>
          <FormGroup>
            <TextField
              id="provide-help-title"
              name="title"
              label="Title"
              required
              value={state.title}
              onChange={handleChange}
              margin="normal"
              disabled={!isAuthenticated}
            />
            <TextField
              required
              id="provide-help-description"
              name="description"
              label="Description"
              multiline
              rows={3}
              value={state.description}
              onChange={handleChange}
              margin="normal"
              disabled={!isAuthenticated}
            />
            <TextField
              required
              id="provide-help-category"
              name="category"
              label="Category"
              value={state.category}
              onChange={handleChange}
              margin="normal"
              disabled={!isAuthenticated}
            />
            <TextField
              required
              id="provide-help-location"
              name="location"
              label="Location"
              value={state.location}
              onChange={handleChange}
              margin="normal"
              disabled={!isAuthenticated}
            />
            <TextField
              required
              id="provide-help-maxRefugeesCount"
              name="maxRefugeesCount"
              label="maxRefugeesCount"
              value={state.maxRefugeesCount}
              onChange={handleChange}
              margin="normal"
              type="number"
              sx={{ maxWidth: "220px" }}
              disabled={!isAuthenticated}
            />
            <FormControl margin="normal" required disabled={!isAuthenticated}>
              <FormLabel id="provide-help-preferred-contact-method">
                Preferred contact method
              </FormLabel>
              <RadioGroup
                name="preferredContactMethod"
                value={state.preferredContactMethod}
                onChange={handleChange}
                sx={{ width: "fit-content" }}
              >
                <FormControlLabel
                  value="phone-call"
                  control={<Radio required sx={{ width: "fit-content" }} />}
                  label="Phone call"
                />
                <FormControlLabel
                  value="text-message"
                  control={<Radio required sx={{ width: "fit-content" }} />}
                  label="Text message"
                />
                <FormControlLabel
                  value="email"
                  control={<Radio required sx={{ width: "fit-content" }} />}
                  label="Email"
                />
              </RadioGroup>
            </FormControl>

            {(state.preferredContactMethod === "phone-call" ||
              state.preferredContactMethod === "text-message") && (
              <TextField
                disabled
                id="provide-help-phone-number"
                label="Phone number"
                value={contactData.phoneNumber}
                margin="normal"
                type="tel"
                helperText={
                  "If you want to use a different phone number, change your profile settings."
                }
              />
            )}

            {state.preferredContactMethod === "email" && (
              <TextField
                disabled
                id="provide-help-email"
                label="Email address"
                value={contactData.emailContact}
                helperText={
                  "If you want to use a different email, change your profile settings."
                }
                margin="normal"
                type="email"
              />
            )}

            <FormControlLabel
              control={
                <Checkbox
                  name="isAnonymous"
                  checked={state.isAnonymous}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.checked,
                    });
                  }}
                />
              }
              label="Do you want to remain anonymous?"
              sx={{ width: "fit-content" }}
            />
          </FormGroup>
          <FormHelperText sx={{ marginTop: "15px" }}>
            * Please check if your contact info is correct on your profile
            before clicking submit
          </FormHelperText>

          <Button
            type="submit"
            variant="contained"
            sx={{ width: "100%", margin: "5px" }}
            disabled={!isAuthenticated}
          >
            Submit
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </FormControl>
    </div>
  );
};

export default ProvideHelpForm;
