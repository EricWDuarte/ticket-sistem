import { Alert, Button, Dialog, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TicketList from "../components/Ticket/TicketList";
import { useAuth } from "../contexts/AuthContext";
import CreateTicketModal from "../components/Ticket/CreateTicketModal";
import { collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { GetUserTickets } from "../apis/TicketsApi";
import AppBar from "../components/AppBar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function ActivityPage(props) {
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
      const data = await GetUserTickets(currentUser.uid);
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

  function completedPage() {
    navigate("/completed", { replace: true });
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
                Your list of tickets is empty.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" textAlign="center">
                Add some new tickets to get started!
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
      <div className="add-button-margin">
        <div className="round add-button shadow">
          <Button onClick={handleOpenModal} className="add-button">
            <Typography variant="h4" className="sColor">
              +
            </Typography>
          </Button>
        </div>
      </div>
      <TicketList query={query} filterType={filterType} dataList={ticketList} />
      <Dialog open={openModal} onBackdropClick={handleCloseModal}>
        <CreateTicketModal close={handleCloseModal} />
      </Dialog>
      <div onClick={completedPage} className="btn-right center-vertically">
        <div className="margin-left">
          <Typography color="#eeeeee">Completed</Typography>
        </div>
        <ArrowForwardIcon className="backColor icon-margin" fontSize="large" />
      </div>
    </div>
  );
}

export default ActivityPage;
