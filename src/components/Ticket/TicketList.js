import FixedSizeList from "@mui/material/List";
import TicketItem from "./TicketItem";
import classes from "./TicketList.module.css";


function TicketList() {
  return (
    <div>
      <FixedSizeList className={classes.list}>
        <TicketItem
          title="Lorem ipsum"
          product="Product"
          priority="Priority"
          frase="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          impactedUsers="5-10"
        />
      </FixedSizeList>
    </div>
  );
}


export default TicketList;
