import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import validator from "validator";

import Classes from "./forms.module.css";
import { Alert, Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function CreateAccountForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validator.isEmail(emailRef.current.value)) {
      setError("Email is not valid.");
    } else if (passwordRef.current.value !== repeatPasswordRef.current.value) {
      setError("Passwords do no match.");
    } else if (passwordRef.current.value.length < 6) {
      setError("Password requires at least 6 characters.");
    } else {
      try {
        setError("");
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value);
        navigate("/signin", { replace: true });
      } catch {
        setError("Failed to create an account.");
        setLoading(false);
      }
    }
  }

  return (
    <div>
      <Card elevation={4} className={Classes.card}>
        <Box m={4}>
          <Box mb={5}>
            <Typography variant="h1" align="center">
              Sign Up
            </Typography>
          </Box>
          {error && <Alert severity="warning">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <Box mt={3} mb={3}>
              <TextField
                className={Classes.input}
                variant="filled"
                fullWidth
                required
                inputRef={emailRef}
                label="Email"
              />
              <TextField
                className={Classes.input}
                variant="filled"
                type="password"
                fullWidth
                required
                inputRef={passwordRef}
                label="Password"
              />
              <TextField
                className={Classes.input}
                variant="filled"
                type="password"
                fullWidth
                required
                inputRef={repeatPasswordRef}
                label="Password"
              />
            </Box>
            <Box mb={3}>
              <Button
                disabled={loading}
                type="submit"
                value="Submit"
                color="primary"
                className={Classes.btn}
                fullWidth
              >
                Confirm
              </Button>
            </Box>
            <Divider className="width100"></Divider>
          </form>
          <Grid container mt={2} justifyContent="center" item xs={12}>
            <Typography>
              Already have an account? <Link to="/signin">Sing in</Link>
            </Typography>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default CreateAccountForm;
