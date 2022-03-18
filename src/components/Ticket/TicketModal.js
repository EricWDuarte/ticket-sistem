import Card from "@mui/material/Card";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";

function TicketModal (props) {
    return (
        <ListItem>
          <Card>
            <Typography variant="h2">
                {props.title}
            </Typography>
            <Typography variant="p" color="textPrimary">
                {props.description}
            </Typography>
            <Typography variant="p" color="textSecondary">
                {props.product}
            </Typography>
            <Typography variant="p" color="textSecondary">
                Categoria
            </Typography>
            <Typography variant="p" color="textSecondary">
                Prioridade
            </Typography>
            <Typography variant="p" color="textSecondary">
                Problema em uma frase
            </Typography>
            <Typography variant="p" color="textSecondary">
                Descrição
            </Typography>
            <Typography variant="p" color="textSecondary">
                Usuários impactados
            </Typography>
            <Typography variant="p">
                Operação está parada?
            </Typography>
            <Typography variant="p">
                Informações do ambiente
            </Typography>
            <Typography variant="p">
                Anexos
            </Typography>
          </Card>
        </ListItem>
      );
}