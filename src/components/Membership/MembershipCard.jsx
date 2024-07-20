import { Grid, Button, Typography, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import getBenefits from "../../utils/getBenefits";
import { useTranslation } from "react-i18next";

function MembershipCard({ membership, onEditClick, onDeleteClick }) {
  const { t } = useTranslation();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box border="2px solid #555CB3" p={3} m={2} borderRadius={1}>
        <Typography variant="h6" gutterBottom>
          {membership.name}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          {t("view_membership_edit_card_price")}: {membership.amount}{" "}
          {membership.currency}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {t("view_membership_edit_card_type")}:{" "}
          <b>{getBenefits(membership).type}</b>
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
            {t("view_membership_edit_btn")}
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
            {t("view_membership_delete_btn")}
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}

export default MembershipCard;
