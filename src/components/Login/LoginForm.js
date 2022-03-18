import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";

import Classes from "./forms.module.css";
import { Button, Typography } from "@mui/material";

function LoginForm() {
  return (
    <div>
      <Card elevation={4} className={Classes.card}>
        <div className={Classes.form}>
          <Typography color="primary" variant="h2" align="center">
            Login
          </Typography>
          <form action="">
            <TextField
              className={Classes.input}
              variant="filled"
              fullWidth
              required
              id="email"
              label="Email"
            />
            <TextField
              className={Classes.input}
              variant="filled"
              fullWidth
              required
              id="password"
              label="Password"
            />
            <Button color="primary" className={Classes.btn} fullWidth>
              Confirm
            </Button>
          </form>
          <div className={Classes.link}>
            <Link to="/password-change">Forgot Password?</Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default LoginForm;
