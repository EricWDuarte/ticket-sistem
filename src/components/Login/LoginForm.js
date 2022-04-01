import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Alert, Box, Button, Divider, Grid, Typography } from "@mui/material";

import Classes from "./forms.module.css";
import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { CreateUserHistory } from "../../apis/TicketsApi"

function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signin, currentUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
      navigate("/", { replace: true });
    } catch {
      setError("Email or password is incorrect.");
      setLoading(false);
    }
  }

  return (
    <div>
      <Card elevation={4} className={Classes.card}>
        <Box m={4}>
          <Box mb={5}>
            <Typography variant="h1" align="center">
              Sign In
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
          </form>
          <Divider className="width100"></Divider>
          <Grid mt={0.1} container spacing={2} justifyContent="center">
          <Grid container justifyContent="center" item xs={12}>
            <Typography>Need an account? <Link to="/signup">Sing up</Link></Typography>
          </Grid>
          <Grid container justifyContent="center" item xs={12}>
            <Typography><Link to="/password-change">Forgot Password?</Link></Typography>
          </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default LoginForm;
