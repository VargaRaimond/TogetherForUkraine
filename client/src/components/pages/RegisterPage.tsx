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
import { useAuth0 } from "@auth0/auth0-react";
import { AuthRoleIds } from "../utils/authRoles";

interface INewAccount {
  name: string;
  emailContact: string;
  phoneNumber: string;
  role: string;
}

const RegisterPage = () => {
  const { user } = useAuth0();
  const [state, setState] = React.useState<INewAccount>({
    name: "",
    emailContact: "",
    phoneNumber: "",
    role: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!user?.sub) return false;

    fetch(`/api/auth/${user?.sub}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: state.role }),
    }).then(() => {
      fetch("/api/person/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user?.sub, ...state }),
      }).then(() => {
        window.location.reload();
      });
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
              name="emailContact"
              label="Contact e-mail"
              value={state.emailContact}
              onChange={handleChange}
              margin="normal"
              type="email"
              inputProps={{
                maxlength: 50
              }}
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
              inputProps={{
                maxlength: 20
              }}
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
                  value={AuthRoleIds.Refugee}
                  control={<Radio required sx={{ width: "fit-content" }} />}
                  label="I'm a refugee and I'd like to get help."
                />
                <FormControlLabel
                  value={AuthRoleIds.Volunteer}
                  control={<Radio required sx={{ width: "fit-content" }} />}
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
