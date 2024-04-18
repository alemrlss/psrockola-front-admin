import React from "react";
import { Grid, Button, Typography, Box } from "@mui/material";
import getBenefits from "../../utils/getBenefits";

function MembershipCard({ membership, onEditClick, onDeleteClick }) {
  return (
    <Grid item xs={3}>
      <Box
        border="4px solid #555CB3"
        p={2}
        m={2}
        mt={4}
        borderRadius={4}
        boxShadow={2}
        bgcolor="white"
        textAlign="center" 
      >
        <Typography variant="body1" gutterBottom>
          Name: {membership.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Price: {membership.amount} {membership.currency}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Type: <b>{getBenefits(membership).type}</b>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onEditClick(membership)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onDeleteClick(membership)}
        >
          Delete
        </Button>
      </Box>
    </Grid>
  );
}

export default MembershipCard;
