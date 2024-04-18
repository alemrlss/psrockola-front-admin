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

function ModalEditMembership({
  isModalOpen,
  handleCloseModal,
  selectedMembership,
  setSelectedMembership,
  handleSaveChanges,
}) {
  return (
    <Dialog open={isModalOpen} onClose={handleCloseModal} sx={{ my: 4 }}>
      <Box>
        <DialogTitle>Edit Membership</DialogTitle>
      </Box>
      <DialogContent>
        {selectedMembership && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
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
                label="Price"
                value={selectedMembership.amount}
                onChange={(e) =>
                  setSelectedMembership({
                    ...selectedMembership,
                    amount: e.target.value,
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
          Cancel
        </Button>
        <Button onClick={handleSaveChanges} color="primary" variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalEditMembership;
