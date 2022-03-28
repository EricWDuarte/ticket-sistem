import { useState } from "react";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import Dialog from "@mui/material/Dialog";
import { Button, createTheme, IconButton, ThemeProvider } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import { Box } from "@mui/system";

import CompletedTicketModal from "./CompletedTicketModal";
import { DeleteCompletedTicket, CreateTicket } from "../../apis/TicketsApi";
import { ReactComponent as SideIcon } from "../../assets/sideIcon.svg";

const themeTicket = createTheme({
  typography: {
    h1: {
      fontSize: 16,
      fontWeight: 900,
      paddingTop: 2,
    },

    h2: {
      fontSize: 14,
      fontWeight: 700,
    },

    h3: {
      fontSize: 14,
      paddingTop: 7,
      //lineHeight: 2.3,
    },

    h4: {
      fontSize: 30,
    },
  },
});

function CompletedTicketItem(props) {
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const [isRestoreOpen, setIsRestoreOpen] = useState(false);

  function openTicket() {
    setOpenTicketModal(true);
  }

  function closeTicket() {
    setOpenTicketModal(false);
  }

  function openRestore(e) {
    e.stopPropagation();
    setIsRestoreOpen(true);

    CreateTicket(props.data).then(() => {
      DeleteCompletedTicket(props.id);
    });
  }

  function closeRestore() {
    setIsRestoreOpen(false);
    window.location.reload(false);
  }

  function getPriorityStyle() {
    if (props.priority === "Low") {
      return "successColor";
    } else if (props.priority === "Medium") {
      return "alertColor";
    } else {
      return "warningColor";
    }
  }

  return (
    <div>
      <ThemeProvider theme={themeTicket}>
        <ListItem onClick={openTicket}>
          <div className="width100">
            <div className="round shadow ticket-item center-vertically">
              <div className="side-icon">
                <SideIcon />
              </div>
              <div className="width100">
                <Grid container>
                  <Grid item xs={7} sm={9} md={10} container>
                    <Typography variant="h1" noWrap className="pColor title">
                      {props.title}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={5}
                    sm={3}
                    md={2}
                    container
                    justifyContent="flex-end"
                  >
                    <div className="center-vertically margin-right">
                      <Typography variant="h2" className={getPriorityStyle()}>
                        {props.priority}
                      </Typography>
                      <div className="icon-margin center-vertically">
                        <FmdBadIcon
                          fontSize="small"
                          className={getPriorityStyle()}
                        />
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={7} sm={9} md={10} container>
                    <Typography
                      noWrap
                      gutterBottom
                      variant="h3"
                      className="sColor low-text"
                    >
                      {props.frase}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={5}
                    sm={3}
                    md={2}
                    container
                    justifyContent="flex-end"
                  >
                    <div className="center-vertically margin-right">
                      <Typography variant="h2" className={getPriorityStyle()}>
                        {props.impactedUsers}
                      </Typography>
                      <div className="icon-margin center-vertically">
                        <PersonIcon
                          fontSize="small"
                          className={getPriorityStyle()}
                        />
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className="center-vertically delete-button">
                <div className={"round icon-background sBColor"}>
                  <IconButton onClick={openRestore} className="margin-auto">
                    <ReplayIcon className="backColor margin-auto" />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </ListItem>
      </ThemeProvider>
      <Dialog open={openTicketModal} onBackdropClick={closeTicket}>
        <CompletedTicketModal parentProps={props} close={closeTicket} />
      </Dialog>
      <Dialog open={isRestoreOpen} onBackdropClick={closeRestore}>
        <Box m={3}>
          <Typography>Ticket restored to main list</Typography>
          <Grid container justifyContent="center">
            <Button onClick={closeRestore}>Ok</Button>
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
}

export default CompletedTicketItem;
