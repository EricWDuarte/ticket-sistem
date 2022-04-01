import { Box, Dialog, Typography } from "@mui/material";
import React, { useState } from "react";
import HistoryTicket from "./HistoryTicket";

export default function HistoryItem(props) {
  const [isOpen, setIsOpen] = useState(false);

  const data = props.data;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div onClick={openModal}>
      <Box m={3} className="clickable">
        <div>
          <Typography>{props.children}</Typography>
        </div>
      </Box>
      <Dialog open={isOpen} onBackdropClick={closeModal}>
        <HistoryTicket
          id={data.id}
          title={data.title}
          product={data.product}
          category={data.category}
          priority={data.priority}
          frase={data.frase}
          impactedUsers={data.impactedUsers}
          appStoped={data.appStoped}
          environment={data.environment}
          description={data.description}
          filesUrls={data.filesUrls}
          close={closeModal}
        />
      </Dialog>
    </div>
  );
}
