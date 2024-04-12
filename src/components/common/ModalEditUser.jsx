import { Box, Modal, Tab, Tabs, IconButton } from "@mui/material";
import { useState } from "react";
import UpdateUser from "./Settings/UpdateUser";
import ChangePassword from "./Settings/ChangePassword";
import CloseIcon from "@mui/icons-material/Close";
import UpdatePhoto from "./Settings/UpdatePhoto";

function ModalEditUser({ openModal, handleCloseModal, user }) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="user-settings-modal"
      aria-describedby="user-settings-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            width: 600, // Ancho fijo del modal
            height: 400, // Altura fija del modal
            bgcolor: "white",
            boxShadow: 24,
            p: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton onClick={handleCloseModal}>
              <CloseIcon
                sx={{
                  color: "red",
                  border: "1px solid red",
                  borderRadius: "50%",
                }}
              />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              centered
              aria-label="User Settings Tabs"
              sx={{ mb: 2 }}
            >
              <Tab label="Update user" />
              {<Tab label="Change password" />}
            </Tabs>

            {tabValue === 0 && <UpdateUser user={user} />}
            {tabValue === 1 && <ChangePassword user={user} />}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default ModalEditUser;
