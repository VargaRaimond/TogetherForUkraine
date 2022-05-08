import { PageWrapper } from "../utils/CommonComponents";
import React, { FormEvent } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

interface INewAccount {
  name: string;
  contactEmail: string;
  phoneNumber: string;
  role: string;
}

const RegisterPage = () => {
  const [state, setState] = React.useState<INewAccount>({
    name: "",
    contactEmail: "",
    phoneNumber: "",
    role: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <PageWrapper>
      <FormControl
        component="form"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "start" },
          pl: { xs: 0, md: "20%" },
          mt: "5%",
        }}
        onSubmit={(e: FormEvent) => {
          // TODO: handle submit -> this is called only when there are no validation errors left
          e.preventDefault();
          return false;
        }}
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
              lineHeight: "normal",
            }}
          >
            Welcome
            <br />
            <Typography variant={"caption"}>
              Before you continue, please fill in and submit this form.
            </Typography>
          </FormLabel>

          <FormGroup>
            <TextField
              id="register-name"
              name="name"
              label="Name"
              required
              value={state.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              required
              id="register-contact-email"
              name="contactEmail"
              label="Contact e-mail"
              value={state.contactEmail}
              onChange={handleChange}
              margin="normal"
              type="email"
            />
            <TextField
              required
              id="register-phone-number"
              name="phoneNumber"
              label="Phone number"
              value={state.phoneNumber}
              onChange={handleChange}
              margin="normal"
              type="tel"
            />
            <FormControl margin="normal" required>
              <FormLabel id="role">
                What will be the purpose of this account?
              </FormLabel>
              <RadioGroup
                name="role"
                value={state.role}
                onChange={handleChange}
                sx={{ width: "fit-content" }}
              >
                <FormControlLabel
                  value="refugee"
                  control={<Radio sx={{ width: "fit-content" }} />}
                  label="I'm a refugee and I'd like to get help."
                />
                <FormControlLabel
                  value="volunteer"
                  control={<Radio sx={{ width: "fit-content" }} />}
                  label="I'd like to volunteer and provide help for others."
                />
              </RadioGroup>
            </FormControl>
          </FormGroup>
          <FormHelperText sx={{ marginTop: "15px" }}>
            * Please check if your contact info is correct on your profile
            before clicking submit
          </FormHelperText>

          <Button
            type="submit"
            variant="contained"
            sx={{ width: "100%", margin: "5px" }}
          >
            Submit
          </Button>
        </Box>
      </FormControl>
    </PageWrapper>
  );
};

export default RegisterPage;
