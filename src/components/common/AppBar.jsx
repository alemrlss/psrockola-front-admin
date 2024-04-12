/* eslint-disable react/prop-types */
import LanguageSwitcher from "../LanguageSwitcher";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ModalEditUser from "./ModalEditUser";
import { useState } from "react";

function AppBarComponent({ drawerWidth, handleDrawerToggle }) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: "white",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            display: { sm: "none" },
            color: "black",
            borderRadius: "50px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Sección izquierda del AppBar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          ></Box>

          {/* Sección derecha del AppBar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Selector de idioma */}
            <LanguageSwitcher />
            {/* Nombre y rol */}
            <Box sx={{ mr: 1, ml: 1, textAlign: "right" }}>
              <Typography
                variant="caption"
                component="div"
                sx={{ color: "black" }}
              >
                Andy Scott
              </Typography>
              <Typography variant="body2" component="div" color="textSecondary">
                Admin
              </Typography>
            </Box>

            {/* Avatar */}
            <Avatar
              alt="Andy Avatar"
              src="/path/to/avatar.jpg"
              sx={{ width: 32, height: 32, cursor: "pointer" }}
              onClick={handleOpenModal}
            />
          </Box>
        </Box>
      </Toolbar>
      <ModalEditUser
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        //user={user}
      />
    </AppBar>
  );
}

export default AppBarComponent;
