import { Button, MenuItem, TextField } from "@mui/material";
import List from "@mui/material/List";
import { useEffect, useRef, useState } from "react";
import Pagination from "../Pagination";
import TicketItem from "./TicketItem";

function TicketList(props) {
  const [currentDataList, setCurrentDataList] = useState([]);
  const [filteredDataList, setFilteredDataList] = useState(props.dataList);

  useEffect(() => {
    function filter() {
      if (props.query === "") {
        setFilteredDataList(props.dataList);
        return;
      }

      if (props.filterType === "Search") {
        const temp = props.dataList.filter((ticket) => {
          const objValues = Object.values(ticket);

          return objValues.some((item) => {
            if (item.includes(props.query)) {
              return true;
            }
          });
        });
        setFilteredDataList(temp);
        return;
      }

      if (props.filterType === "Priority") {
        const temp = props.dataList.filter((ticket) => {
          return ticket.priority === props.query;
        });
        setFilteredDataList(temp);
        return;
      }
    }

    filter();
  }, [props.dataList, props.query, props.filterType]);

  function listToShow(list) {
    setCurrentDataList(list);
    return list;
  }

  return (
    <div>
      <List>
        {props.children}
        {currentDataList.map((data) => (
          <TicketItem
            key={data.id}
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
            actions={data.actions}
            data={data}
          />
        ))}
      </List>
      <Pagination list={filteredDataList} setCurrentDataList={listToShow} />
    </div>
  );
}

export default TicketList;
