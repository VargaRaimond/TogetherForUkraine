import * as React from "react";
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
} from "@mui/material";

interface IProvideHelpData {
  title: string;
  description: string;
  category: string;
  location: string;
  maxPeopleCount: number | string;
  preferredContactMethod: string;
  // + display current data
  isAnonymous: boolean;
  phoneNumber: string;
  email: string;
}

const ProvideHelpForm = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [state, setState] = React.useState<IProvideHelpData>({
    title: "",
    description: "",
    category: "",
    location: "",
    maxPeopleCount: "",
    preferredContactMethod: "",
    isAnonymous: false,
    // TODO db: fetch current contact info
    phoneNumber: "0722 deja imi suna cunoscut",
    email: "email@email.com",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
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
              id="provide-help-maxPeopleCount"
              name="maxPeopleCount"
              label="maxPeopleCount"
              value={state.maxPeopleCount}
              onChange={handleChange}
              margin="normal"
              type="number"
              sx={{ maxWidth: "220px" }}
              disabled={!isAuthenticated}
            />
            <FormControl margin="normal" disabled={!isAuthenticated}>
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
                  control={<Radio sx={{ width: "fit-content" }} />}
                  label="Phone call"
                />
                <FormControlLabel
                  value="text-message"
                  control={<Radio sx={{ width: "fit-content" }} />}
                  label="Text message"
                />
                <FormControlLabel
                  value="email"
                  control={<Radio sx={{ width: "fit-content" }} />}
                  label="Email"
                />
              </RadioGroup>
            </FormControl>

            {(state.preferredContactMethod === "phone-call" ||
              state.preferredContactMethod === "text-message") && (
              <TextField
                required
                id="provide-help-phone-number"
                name="phoneNumber"
                label="Phone number"
                value={state.phoneNumber}
                onChange={handleChange}
                margin="normal"
                type="tel"
                sx={{ maxWidth: "220px" }}
              />
            )}

            {state.preferredContactMethod === "email" && (
              <TextField
                required
                id="provide-help-email"
                name="email"
                label="Email address"
                value={state.email}
                onChange={handleChange}
                margin="normal"
                type="email"
              />
            )}

            <FormControlLabel
              control={
                <Checkbox
                  name="isAnonymous"
                  value={state.isAnonymous}
                  onChange={handleChange}
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
        </Box>
      </FormControl>
    </div>
  );
};

export default ProvideHelpForm;
