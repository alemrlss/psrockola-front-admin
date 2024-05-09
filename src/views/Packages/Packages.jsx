import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import api from "../../api/api";

function Packages() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Nuevo estado para el mensaje de éxito

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convertir el precio a centavos
    const priceInCents = parseFloat(price) * 100;

    console.log(type);
    try {
      // Realizar la solicitud al backend para crear el Package
      await api.post("package-rockobits", {
        name,
        currency: "USD",
        amount: parseFloat(amount),
        price: priceInCents,
        type,
      });

      // Limpiar los campos después de crear el Package
      setName("");
      setType("");
      setAmount("");
      setPrice("");
      setErrorMessage("");
      setSuccessMessage("Package created successfully"); // Establecer el mensaje de éxito

      // Limpiar el mensaje de éxito después de 4 segundos
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);

      // Manejar la respuesta del servidor aquí si es necesario
    } catch (error) {
      // Manejar errores de la solicitud
      console.error("Error al crear el Package:", error);
      setErrorMessage(
        "Error al crear el Package. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} p={4} boxShadow={3} borderRadius={4}>
        <Typography variant="h4">Create Package</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="name"
            label="Name Package"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            id="amount"
            label="Amount (RB)"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            id="price"
            label="Price (USD)"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            margin="normal"
          />
<FormControl fullWidth>
    <InputLabel id="type-label">Type</InputLabel>
    <Select
        labelId="type-label"
        id="type"
        name="type"
        label="Type"
        onChange={(e) => setType(e.target.value)}
        value={type}
    >
        <MenuItem value="">
            <em>None</em> 
        </MenuItem>
        <MenuItem value="companies">Companies</MenuItem>
        <MenuItem value="distributors">Distributors</MenuItem>
    </Select>
</FormControl>


          {errorMessage && (
            <Typography variant="body2" color="error" gutterBottom>
              {errorMessage}
            </Typography>
          )}
          {successMessage && (
            <Typography
              variant="body2"
              color="success"
              sx={{
                color: "#4BB543",
                fontWeight: "bold",
              }}
              gutterBottom
            >
              {successMessage}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{
              mt: 2,
              backgroundColor: "#555CB3",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#555CB3" },
            }}
          >
            Crear Package
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Packages;
