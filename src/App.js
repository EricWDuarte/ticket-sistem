import { Route, Routes } from "react-router-dom";

import "./App.css";
import LoginPage from "./pages/LoginPage";
import ActivityPage from "./pages/ActivityPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import React from "react";



function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/main" element={<ActivityPage />} />
          <Route path="/password-change" element={<ChangePasswordPage />} />
          <Route path="/new-account" element={<CreateAccountPage />} />
        </Routes>
    </div>
  );
}

export default App;
