import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import Iframe from "react-iframe";

export default function HistoryTicket(props) {
  const urls = props.filesUrls;

  function closeModal(e) {
      e.stopPropagation();
    props.close();
  }

  return (
    <div>
      <Box m={5}>
        <Grid container spacing={2}>
          <Grid container justifyContent="center" item xs={12}>
            <Typography variant="h1">{props.title}</Typography>
          </Grid>
          <Grid container justifyContent="center" item xs={12}>
            <Typography variant="body1">{props.frase}</Typography>
          </Grid>
          <Divider className="width100"></Divider>
          <Grid item xs={12}>
            <Typography display="inline" variant="h2">
              Product:{" "}
            </Typography>
            <Typography display="inline" variant="body1">
              {props.product}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography display="inline" variant="h2">
              Category:{" "}
            </Typography>
            <Typography display="inline" variant="body1">
              {props.category}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography display="inline" variant="h2">
              Environment:{" "}
            </Typography>
            <Typography display="inline" variant="body1">
              {props.environment}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography display="inline" variant="h2">
              Priority:{" "}
            </Typography>
            <Typography display="inline" variant="body1">
              {props.priority}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography display="inline" variant="h2">
              Impacted Users:{" "}
            </Typography>
            <Typography display="inline" variant="body1">
              {props.impactedUsers}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography display="inline" variant="h2">
              App Stoped:{" "}
            </Typography>
            <Typography display="inline" variant="body1">
              {props.appStoped ? "Yes" : "No"}
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
                      <div className="margin-auto file-button">
                        Click to open
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            );
          })}

          <Grid container justifyContent="space-evenly" item xs={12}>
            <Button onClick={(event) => closeModal(event)}>Close</Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
