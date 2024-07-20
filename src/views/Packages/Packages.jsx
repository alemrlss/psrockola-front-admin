import { useEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";

function Packages() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [countryId, setCountryId] = useState(""); // Estado para el país seleccionado
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
  const [countries, setCountries] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("/country/selects");
        const countries = response.data;
        setCountries(countries.data);
      } catch (error) {
        console.error("Error al obtener países:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convertir el precio a centavos
    const priceInCents = parseFloat(price) * 100;

    try {
      // Realizar la solicitud al backend para crear el Package
      await api.post("package-rockobits", {
        name,
        currency: "USD",
        amount: parseFloat(amount),
        price: priceInCents,
        type,
        countryId, // Agregar el countryId en la solicitud
      });

      // Limpiar los campos después de crear el Package
      setName("");
      setType("");
      setAmount("");
      setPrice("");
      setCountryId(""); // Limpiar la selección del país
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
            label={t("view_packages_create_name")}
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            id="amount"
            label={t("view_packages_create_amount")}
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            id="price"
            label={t("view_packages_create_price")}
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="type-label">
              {t("view_packages_create_type")}
            </InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              label={t("view_packages_create_type")}
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              <MenuItem value="">
                <em>{t("view_packages_create_none")}</em>
              </MenuItem>
              <MenuItem value="companies">
                {t("view_packages_create_companies")}
              </MenuItem>
              <MenuItem value="distributors">
                {t("view_packages_create_distributors")}
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="country-label">
              {t("view_packages_create_country")}
            </InputLabel>
            <Select
              labelId="country-label"
              id="country"
              name="country"
              label="Country"
              onChange={(e) => setCountryId(e.target.value)}
              value={countryId}
              required
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.name}
                </MenuItem>
              ))}
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
            {t("view_packages_create_country")}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Packages;
