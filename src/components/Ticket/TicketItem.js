import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";

import classes from "./TicketItem.module.css";

function TicketItem(props) {
  return (
    <div className={classes.high}>
      <ListItem className={classes.item}>
          <Grid container>
            <Grid item xs={12}>
                
            </Grid>
          
        <Grid container spacing={2} padding="10px">
          <Grid item xs={8}>
            <Typography fontSize="40px" variant="h2">
              {props.title}
            </Typography>
          </Grid>
          <Grid item xs={4} container alignItems="center" direction="row" justifyContent="flex-end">
            <Typography
              variant="p"
              component="h4"
              color="textSecondary"
              marginRight="10px"
            >
              {props.impactedUsers}
            </Typography>
            <PersonIcon />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="p" color="textSecondary">
              {props.frase}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="p" align="right" color="textSecondary">
              <strong>Produto:</strong> {props.product}
            </Typography>
          </Grid>
        </Grid>
        </Grid>
      </ListItem>
    </div>
  );
}

export default TicketItem;
