import { Box, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../api/api";


function ListPackages() {
    const [packages, setPackages] = useState([]);

    // Función para cargar los Packages al cargar el componente
    useEffect(() => {
      loadPackages();
    }, []);
  
    // Función para cargar los Packages
    const loadPackages = async () => {
      try {
        const response = await api.get("package-rockobits");
        setPackages(response.data.data);
      } catch (error) {
        console.error("Error al cargar los Packages:", error);
      }
    };
  return (
    <Box mt={4} bgcolor="background.paper">
      <Typography variant="h4" gutterBottom>
        Packages Available
      </Typography>
      <List>
        {packages.map((pkg, index) => (
          <ListItem
            key={index}
            sx={{
              borderBottom: "1px solid #ccc",
              "&:last-child": {
                borderBottom: "none",
              },
            }}
          >
            <Typography variant="body1">
              <strong>Name:</strong> {pkg.name} | <strong>Amount(RB):</strong>{" "}
              {pkg.rockobitsAmount} | <strong>Price:</strong> {pkg.price / 100}{" "}
              USD
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ListPackages;
