import { useState } from "react";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Dialog,
  ButtonGroup,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Iframe from "react-iframe";

import { DeleteTicketAndAddToHistory } from "../../apis/TicketsApi";
import TicketEdit from "./TicketEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useAuth } from "../../contexts/AuthContext";
import HistoryModal from "../History/HistoryModal";

function TicketModal(props) {
  const [openTicketEdit, setOpenTicketEdit] = useState(false);
  const [openTicketDelete, setOpenTicketDelete] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const urls = props.parentProps.filesUrls;

  const { currentUser } = useAuth();

  const creationEntry = "";
  const historyList = [];

  function closeModal() {
    props.close();
  }

  function openHistoryModal() {
    setOpenHistory(true);
  }

  function closeHistoryModal() {
    setOpenHistory(false);
  }

  function openEdit(e) {
    e.stopPropagation();
    setOpenTicketEdit(true);
  }

  function closeEdit() {
    setOpenTicketEdit(false);
  }

  function openDelete(e) {
    e.stopPropagation();
    setOpenTicketDelete(true);
  }

  async function onDelete() {
    await DeleteTicketAndAddToHistory(props.parentProps.id, currentUser.uid);
    window.location.reload(false);
    closeDelete();
  }

  function closeDelete() {
    setOpenTicketDelete(false);
  }

  return (
    <Box m={5}>
      <Grid container spacing={2}>
        <Grid container justifyContent="center" item xs={12}>
          <Typography variant="h1">{props.parentProps.title}</Typography>
        </Grid>
        <Grid container justifyContent="center" item xs={12}>
          <Typography variant="body1">{props.parentProps.frase}</Typography>
        </Grid>
        <Divider className="width100"></Divider>
        <Grid item xs={12}>
          <Typography display="inline" variant="h2">
            Product:{" "}
          </Typography>
          <Typography display="inline" variant="body1">
            {props.parentProps.product}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography display="inline" variant="h2">
            Category:{" "}
          </Typography>
          <Typography display="inline" variant="body1">
            {props.parentProps.category}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography display="inline" variant="h2">
            Environment:{" "}
          </Typography>
          <Typography display="inline" variant="body1">
            {props.parentProps.environment}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography display="inline" variant="h2">
            Priority:{" "}
          </Typography>
          <Typography display="inline" variant="body1">
            {props.parentProps.priority}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography display="inline" variant="h2">
            Impacted Users:{" "}
          </Typography>
          <Typography display="inline" variant="body1">
            {props.parentProps.impactedUsers}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography display="inline" variant="h2">
            App Stoped:{" "}
          </Typography>
          <Typography display="inline" variant="body1">
            {props.parentProps.appStoped ? "Yes" : "No"}
          </Typography>
        </Grid>
        {urls.map((url) => {
          return (
            <Grid item key={url} xs={12} md={6}>
              <div
                className="file"
                style={{
                  height: "100px",
                  width: "100%",
                  top: "0",
                  left: "0",
                  position: "relative",
                }}
              >
                <Iframe
                  styles={{}}
                  src={url}
                  height="100"
                  width="100%"
                  frameBorder="0"
                ></Iframe>
                <div
                  className="file-linker"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    cursor: "pointer",
                  }}
                  onClick={() => window.open(url, "_blank")}
                >
                  <div className="center-vertically">
                    <div className="margin-auto file-button">Click to open</div>
                  </div>
                </div>
              </div>
            </Grid>
          );
        })}

        <Grid container justifyContent="space-evenly" item xs={12}>
          <IconButton onClick={openDelete} className="margin-auto">
            <DeleteForeverIcon className="warningColor margin-auto" />
          </IconButton>
          <IconButton onClick={openEdit} className="margin-auto">
            <EditIcon className="alertColor margin-auto" />
          </IconButton>
          <IconButton onClick={openHistoryModal}>
            <FormatListBulletedIcon className="margin-auto" />
          </IconButton>
          <Button onClick={closeModal}>Close</Button>
        </Grid>
      </Grid>
      <Dialog open={openTicketEdit} onBackdropClick={closeEdit}>
        <TicketEdit parentProps={props.parentProps} close={closeEdit} />
      </Dialog>
      <Dialog open={openHistory} onBackdropClick={closeHistoryModal}>
        <HistoryModal
          list={props.parentProps.actions}
          close={closeHistoryModal}
        />
      </Dialog>
      <Dialog open={openTicketDelete} onBackdropClick={closeDelete}>
        <Box m={2}>
          <Typography>Are you sure you want to delete?</Typography>
          <Grid container justifyContent="center">
            <ButtonGroup>
              <Button onClick={onDelete}>Yes</Button>
              <Button onClick={closeDelete}>Cancel</Button>
            </ButtonGroup>
          </Grid>
        </Box>
      </Dialog>
    </Box>
  );
}

export default TicketModal;
