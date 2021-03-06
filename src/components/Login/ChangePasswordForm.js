import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Alert, Button, Divider, Grid, Typography } from "@mui/material";

import Classes from "./forms.module.css";
import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Box } from "@mui/system";

function ChangePasswordPage() {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check email for a link to change your password");
    } catch (e) {
      console.log(e);
      setError("Failed to change password.");
      setLoading(false);
    }
  }

  return (
    <div>
      <Card elevation={4} className={Classes.card}>
        <Box m={4}>
          <Box mb={5}>
            <Typography variant="h1" align="center">
              Change Password
            </Typography>
          </Box>
          {error && <Alert severity="warning">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}
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
                Send Email
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

export default ChangePasswordPage;
