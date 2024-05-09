// SidebarItemCollapse.js

// Importa los módulos necesarios
import { useState } from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";

// Define el componente SidebarItemCollapse
function SidebarItemCollapse({
  item,
  t,
  handleDrawerToggle,
  handleItemClick,
  activeItem,
  depth = 0, // Inicializa el nivel de profundidad
}) {
  // Estado para manejar la expansión y colapso de los subitems
  const [open, setOpen] = useState(false);

  // Maneja el clic para expandir o colapsar los subitems
  const handleClick = () => {
    setOpen(!open);
  };

  // Calcula el margen izquierdo basado en el nivel de profundidad
  const marginLeft = depth * 10 + 30; // 20px de margen adicional por nivel de profundidad

  return (
    <>
      {/* Botón para el elemento principal */}
      <ListItemButton
        sx={{
          display: "flex",
          marginLeft: `${marginLeft}px`, // Aplica el margen calculado
          marginRight: "30px",
          "&:hover": {
            backgroundColor: "#8087DF",
            borderRadius: "60px",
          },
          "&:not(:hover)": {
            backgroundColor: "transparent",
            borderRadius: "40px",
          },
        }}
        onClick={handleClick}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          className="space-x-4"
        >
          <ListItemIcon sx={{ color: "white", minWidth: 0 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText
            sx={{ color: "white", ml: 0 }}
            primary={t(item.translationKey)}
          />
          {open ? (
            <ExpandLess sx={{ color: "white" }} />
          ) : (
            <ExpandMore sx={{ color: "white" }} />
          )}
        </Box>
      </ListItemButton>

      {/* Lista de subitems */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {item.subItems.map((subItem, index) =>
            // Si el subitem tiene subitems, se llama recursivamente a SidebarItemCollapse
            subItem.subItems && subItem.subItems.length > 0 ? (
              <SidebarItemCollapse
                item={subItem}
                t={t}
                key={index}
                handleDrawerToggle={handleDrawerToggle}
                handleItemClick={handleItemClick}
                activeItem={activeItem}
                depth={depth + 1} // Incrementa el nivel de profundidad
              />
            ) : (
              // Manejo de subitems
              <Link
                to={`${item.id}/${subItem.id}`}
                key={index}
                onClick={handleDrawerToggle}
              >
                {/* Botón de subitem */}
                <ListItemButton
                  selected={subItem.id === activeItem}
                  onClick={() => handleItemClick(subItem.id)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    marginLeft: `${marginLeft + 20}px`, // Aplica margen adicional
                    marginRight: "30px",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#8087DF",
                      borderRadius: "60px",
                      fontWeight: "bold",
                    },
                    "&:not(:hover)": {
                      backgroundColor: "transparent",
                      borderRadius: "40px",
                      fontWeight: "bold",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#f0f0f0",
                      color: "#555CB3",
                      fontWeight: "bold",
                      borderRadius: "60px",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#f0f0f0",
                      color: "#555CB3",
                      fontWeight: "bold",
                      borderRadius: "60px",
                    },
                    fontSize: "14px", // Cambia el tamaño de fuente para subitems
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="space-x-4"
                  >
                    <ListItemIcon
                      sx={{
                        color: subItem.id === activeItem ? "#555CB3" : "white",
                        minWidth: 0,
                      }}
                    >
                      {subItem.icon}
                    </ListItemIcon>
                    <ListItemText
                      sx={{ ml: 0 }}
                      primary={t(subItem.translationKey)}
                    />
                  </Box>
                </ListItemButton>
              </Link>
            )
          )}
        </List>
      </Collapse>
    </>
  );
}

export default SidebarItemCollapse;
