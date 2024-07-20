import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function ModalDeleteMembership({
  isModalOpen,
  handleCloseModal,
  handleDeleteMembership,
}) {
  const { t } = useTranslation();
  return (
    <Dialog open={isModalOpen} onClose={handleCloseModal} sx={{ my: 4 }}>
      <Box>
        <DialogTitle>{t("view_membership_modaldelete_title")}</DialogTitle>
      </Box>
      <DialogContent>
        <Typography variant="body1" color="error" gutterBottom>
          {t("view_membership_modaldelete_message")}{" "}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
          {t("view_membership_modaldelete_cancel")}{" "}
        </Button>
        <Button
          onClick={handleDeleteMembership}
          color="primary"
          variant="contained"
        >
          {t("view_membership_modaldelete_delete")}{" "}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalDeleteMembership;
