import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function ModalEditMembershipDistributor({
  isModalOpen,
  handleCloseModal,
  selectedMembership,
  setSelectedMembership,
  handleSaveChanges,
}) {
  const { t } = useTranslation();
  return (
    <Dialog open={isModalOpen} onClose={handleCloseModal} sx={{ my: 4 }}>
      <Box>
        <DialogTitle>{t("view_membership_modaledit_title")}</DialogTitle>
      </Box>
      <DialogContent>
        {selectedMembership && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label={t("view_membership_modaledit_name")}
                value={selectedMembership.name}
                onChange={(e) =>
                  setSelectedMembership({
                    ...selectedMembership,
                    name: e.target.value,
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t("view_membership_modaledit_price")}
                value={selectedMembership.amount / 100}
                onChange={(e) =>
                  setSelectedMembership({
                    ...selectedMembership,
                    amount: e.target.value * 100,
                  })
                }
                fullWidth
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
          {t("view_membership_modaledit_cancel")}
        </Button>
        <Button onClick={handleSaveChanges} color="primary" variant="contained">
          {t("view_membership_modaledit_save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalEditMembershipDistributor;
