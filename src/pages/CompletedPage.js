import { Alert, Button, Dialog, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CompletedTicketList from "../components/Ticket/CompletedTicketList";
import { useAuth } from "../contexts/AuthContext";
import { collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { GetCompletedUserTickets } from "../apis/TicketsApi";
import AppBar from "../components/AppBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function CompletedPage(props) {
  const { currentUser } = useAuth();
  const [ticketList, setTicketList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const [filterType, setFilterType] = useState("Search");
  const [query, setQuery] = useState("");

  function changeFilter(newValue) {
    setFilterType(newValue);
  }

  function changeSearch(newQuery) {
    setQuery(newQuery);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetCompletedUserTickets(currentUser.uid);
      setTicketList(data);
    };

    fetchData();
  }, []);

  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function mainPage() {
    navigate("/", { replace: true });
  }

  return (
    <div>
      <AppBar
        filterType={filterType}
        setFilterType={changeFilter}
        changeSearch={changeSearch}
      />
      {ticketList.length === 0 && (
        <Grid container justifyContent="center">
          <Grid
            container
            item
            xs={9}
            m={6}
            rowSpacing={2}
            justifyContent="center"
          >
            <Grid item xs={12}>
              <Typography variant="h1" textAlign="center">
                Your list of completed tickets is empty.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" textAlign="center">
                Go to the <Link to="/">main page</Link> and complete some
                tickets
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
      <CompletedTicketList query={query} filterType={filterType} dataList={ticketList} />
      <div onClick={mainPage} className="btn-left center-vertically">
        <Grid container justifyContent="flex-end" alignContent="center">
          <ArrowBackIcon
            className="backColor icon-margin margin-right"
            fontSize="large"
          />
          <div className="margin-right margin-auto">
            <Typography color="#eeeeee">Main</Typography>
          </div>
        </Grid>
      </div>
    </div>
  );
}

export default CompletedPage;
