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

function ModalDeleteMembership({
  isModalOpen,
  handleCloseModal,
  selectedMembership,
  setSelectedMembership,
  handleDeleteMembership
}) {
  return (
    <Dialog open={isModalOpen} onClose={handleCloseModal} sx={{ my: 4 }}>
      <Box>
        <DialogTitle>Delete Membership</DialogTitle>
      </Box>
      <DialogContent>
        <Typography variant="body1" color="error" gutterBottom>
          Are you sure you want to delete this membership?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDeleteMembership} color="primary" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalDeleteMembership;
