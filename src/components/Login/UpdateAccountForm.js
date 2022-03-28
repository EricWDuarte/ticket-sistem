import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

import Classes from "./forms.module.css";
import { Alert, Button, Divider, Grid, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Box } from "@mui/system";

function UpdateAccountForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, changeEmail, changePassword } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const promisses = [];
    setLoading(true);

    if (emailRef.current.value !== currentUser.email) {
      promisses.push(changeEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promisses.push(changePassword(passwordRef.current.value));
    }

    Promise.all(promisses)
      .then(() => {
        setError("");
        navigate("/", { replace: true });
      })
      .catch(() => {
        setError("Failed to update account");
        setLoading(false);
      });
  }

  return (
    <div>
      <Card elevation={4} className={Classes.card}>
        <Box m={4}>
          <Box mb={5}>
            <Typography variant="h1" align="center">
              Update Account
            </Typography>
          </Box>
          {error && <Alert severity="warning">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <Box mt={3} mb={3}>
              <TextField
                className={Classes.input}
                variant="filled"
                fullWidth
                inputRef={emailRef}
                label="Email"
              />
              <TextField
                className={Classes.input}
                variant="filled"
                type="password"
                fullWidth
                inputRef={passwordRef}
                label="Password"
              />
              <TextField
                className={Classes.input}
                variant="filled"
                type="password"
                fullWidth
                inputRef={repeatPasswordRef}
                helperText="Leave passwords blank to keep the same"
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
              <Link to="/">Cancel</Link>
            </Typography>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default UpdateAccountForm;
