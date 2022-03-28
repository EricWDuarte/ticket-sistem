import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import "./App.css";
import "./style.css";
import LoginPage from "./pages/LoginPage";
import ActivityPage from "./pages/ActivityPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import UpdateAccountPage from "./pages/UpdateAccountPage";
import CompletedPage from "./pages/CompletedPage";
import { createTheme, Paper, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#172216" },
    secondary: { main: "#627361" },
    error: { main: "#691010" },
    warning: { main: "#87650d" },
    success: { main: "#497e05" },
  },
  typography: {
    h1: {
      fontSize: 30,
      fontWeight: 700,
      color: "#172216",
    },

    h2: {
      fontSize: 14,
      fontWeight: 700,
      color: "#172216",
    },

    body1: {
      fontSize: 14,
      color: "#627361",
    },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        root: {},
        paper: {
          backgroundColor: "#eeeeee",
          borderRadius: 30,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          border: "none",

          "&:hover": {
            border: "none",
            backgroundColor: "#eeeeee",
          },

          "&.Mui-disabled": {
            border: "none",
          },

          ".MuiTouchRipple-child": {
            backgroundColor: "#627361",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          outline: "none",
          outlineColor: "#ff0000",
          borderRadius: 28,
          border: "none",

          "&:hover": {
            border: "none",
          },
        },
      },
    },
  },
});

function App() {
  const [reload, setReload] = useState(false);

  function handleReload() {
    setReload(!reload);
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<ActivityPage />} />
              <Route path="/completed" element={<CompletedPage />} />
              <Route path="/update" element={<UpdateAccountPage />} />
            </Route>
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<CreateAccountPage />} />
            <Route path="/password-change" element={<ChangePasswordPage />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
