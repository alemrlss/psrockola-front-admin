import { Grid, Button, Typography, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import getBenefitsMembership from "../../../../utils/getBenefitsMembershipDistributor";

function MembershipCardDistributor({ membership, onEditClick, onDeleteClick }) {
  return (
    <Grid item xs={3}>
      <Box border="2px solid #555CB3" p={3} m={2} borderRadius={1}>
        <Typography variant="h6" gutterBottom>
          {membership.name}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Precio: {membership.amount / 100} {membership.currency}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          gutterBottom
        ></Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Tipo: <b>{membership.type}</b>
        </Typography>

        <Typography variant="body2" color="textSecondary" gutterBottom>
          <b> Cuentas:</b> {getBenefitsMembership(membership.type).accounts}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => onEditClick(membership)}
            startIcon={<Edit />}
            sx={{
              borderRadius: 8,
              padding: "8px 16px",
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "#1976d2",
              },
              marginBottom: 1,
            }}
          >
            Editar
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => onDeleteClick(membership)}
            startIcon={<Delete />}
            sx={{
              borderRadius: 8,
              padding: "8px 16px",
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: "#c62828",
              },
            }}
          >
            Eliminar
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}

export default MembershipCardDistributor;
