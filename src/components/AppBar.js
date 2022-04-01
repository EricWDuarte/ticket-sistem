import {
  Alert,
  Box,
  Dialog,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import HistoryModal from "./History/HistoryModal";

import { GetUserHistory } from "../apis/TicketsApi";
import { DateFormater } from "../utils/DateFormater";

export default function AppBar(props) {
  const { currentUser, signout } = useAuth();
  const navigate = useNavigate();

  const searchRef = useRef("");

  const [error, setError] = useState();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyList, setHistoryList] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const date = DateFormater(new Date(currentUser.metadata.creationTime));
  const creationEntry = `Account Created ${date}`;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function openHistory() {
    const list = await GetUserHistory(currentUser.uid);
    setHistoryList(list[0].actions);
    setIsHistoryOpen(true);
  }

  function closeHistory() {
    setIsHistoryOpen(false);
  }

  function logout() {
    handleClose();
    handleLogout();
  }

  async function handleLogout() {
    try {
      setError("");
      await signout();
      navigate("/signin", { replace: true });
    } catch {
      setError("Failed to logout. Try again");
    }
  }

  function updateAccount() {
    navigate("/update", { replace: true });
  }

  function setFilter(type) {
    props.setFilterType(type);
  }

  function setSearch() {
    props.changeSearch(searchRef.current.value);
  }

  return (
    <div className="appBar">
      {error && (
        <Dialog>
          <Alert severity="warning">{error}</Alert>
        </Dialog>
      )}

      <Dialog open={isHistoryOpen} onBackdropClick={closeHistory}>
        <HistoryModal list={historyList} close={closeHistory}>
          <Box id={-1} m={3}>
            <div>
              <Typography>{creationEntry}</Typography>
            </div>
          </Box>
        </HistoryModal>
      </Dialog>

      <Grid container spacing={2} className="margin">
        <Grid container item xs={12}>
          <Grid item xs={4}>
            <div className="logo">
              <img className="logo" src={logo} alt="Logo" />
            </div>
          </Grid>
          <Grid container item xs={8} justifyContent="flex-end">
            <div className="center-vertically">
              <Typography color="#eeeeee">{currentUser.email}</Typography>
              <div className="icon-margin">
                <IconButton onClick={handleClick}>
                  <SettingsIcon className="icon backColor" />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={updateAccount}>Update Account</MenuItem>
                  <MenuItem onClick={openHistory}>User History</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} item xs={12}>
          <Grid container item xs={3}>
            <div className="center-vertically width100">
              <TextField
                fullWidth
                size="small"
                className="inputRounded"
                select
                defaultValue="Search"
                onChange={(event) => setFilter(event.target.value)}
              >
                <MenuItem value="Search">Search</MenuItem>
                <MenuItem value="Priority">Priority</MenuItem>
              </TextField>
            </div>
          </Grid>
          <Grid item xs={9}>
            <div className="center-vertically width100">
              {props.filterType === "Search" && (
                <TextField
                  fullWidth
                  size="small"
                  className="inputRounded"
                  inputRef={searchRef}
                ></TextField>
              )}
              {props.filterType === "Priority" && (
                <TextField
                  fullWidth
                  size="small"
                  className="inputRounded"
                  defaultValue="High"
                  inputRef={searchRef}
                  select
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </TextField>
              )}

              <IconButton onClick={setSearch} size="small">
                <SearchIcon className="backColor" />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
