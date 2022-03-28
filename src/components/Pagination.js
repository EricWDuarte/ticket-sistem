import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

let currentdataList = [];

export default function Pagination({ list, setCurrentDataList }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [ticketsPerPage, setTicketsPerPage] = useState(3);

  let dataList = list;

  useEffect(() => {
    setCurrentPage(0);
  }, [list]);

  let maxPage = Math.floor((list.length -1)/ ticketsPerPage);
  let startIndex = currentPage * ticketsPerPage;
  let endIndex = currentPage * ticketsPerPage + ticketsPerPage;

  if (endIndex > dataList.length) {
    endIndex = dataList.length;
  }

  let tempList = [];

  for (let i = startIndex; i < endIndex; i++) {
    const element = dataList[i];
    tempList.push(element);
  }

  useEffect(() => {
    currentdataList = tempList;
    setCurrentDataList(currentdataList);
  }, [dataList, currentPage]);

  function updateList() {
    maxPage = Math.floor((list.length -1) / ticketsPerPage);
    startIndex = currentPage * ticketsPerPage;
    endIndex = currentPage * ticketsPerPage + ticketsPerPage;

    if (endIndex > dataList.length) {
      endIndex = dataList.length;
    }

    tempList = [];

    for (let i = startIndex; i < endIndex; i++) {
      const element = dataList[i];
      tempList.push(element);
    }

    currentdataList = tempList;
    setCurrentDataList(currentdataList);
  }

  function nextPage() {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
      updateList();
    }
  }

  function prevPage() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      updateList();
    }
  }

  function setPage(page) {
    setCurrentPage(page);
    updateList();
  }

  return (
    <Grid container justifyContent="center">
      <ButtonGroup className="margin-auto">
        <Button disabled={currentPage === 0} onClick={prevPage}>
          <Typography className={currentPage === 0? "disabled": "sColor"}>{"<"}</Typography>
        </Button>
        {Array(maxPage + 1)
          .fill()
          .map((x, i) => {
            return (
              <Button
                disabled={currentPage === i}
                key={i}
                onClick={() => setPage(i)}
              >
                <Typography className={currentPage === i? "disabled": "sColor"}>{i + 1}</Typography>
              </Button>
            );
          })}
        <Button disabled={currentPage === maxPage} onClick={nextPage}>
          <Typography className={currentPage === maxPage? "disabled": "sColor"}>{">"}</Typography>
        </Button>
      </ButtonGroup>
      </Grid>
  );
}
