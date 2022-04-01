import { Divider, Grid, List, Typography } from "@mui/material";
import React, { useState } from "react";
import HistoryItem from "./HistoryItem";
import { useAuth } from "../../contexts/AuthContext";

export default function HistoryModal(props) {

  return (
    <>
    <Grid container mt={3} mb={3} justifyContent="center">
      <div>
        <Typography variant="h1">History</Typography>
      </div>
    </Grid>
    <Divider className="width100" />
    <List>
      {props.list.map((data, index) => {
        return (
          <HistoryItem key={index} data={data.data}>
            {data.frase}
          </HistoryItem>
        );
      })}
      {props.children}
    </List>
    </>
  );

}
