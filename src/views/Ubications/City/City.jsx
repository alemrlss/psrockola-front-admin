import React, { useState, useEffect, useRef } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  TablePagination,
} from "@mui/material";
import api from "../../../api/api";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function NestedSelects() {
  const token = useSelector((state) => state.auth.token);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [newCityName, setNewCityName] = useState("");
  const [creatingCity, setCreatingCity] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Cambia según tus necesidades
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("/country/selects");
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    // Cuando cambia el estado seleccionado, resetea la página y la búsqueda
    setPage(0);
    setSearchTerm("");
  }, [selectedState]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        // Asegurarse de que haya un stateId antes de hacer la solicitud
        if (selectedState) {
          const response = await api.get(`/city/${selectedState}`, {
            params: {
              take: rowsPerPage,
              skip: page * rowsPerPage,
              name: searchTerm,
            },
          });
          setCities(response.data.data);
          setTotalItems(response.data.total);
          setTotalPages(Math.ceil(response.data.total / rowsPerPage));
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    // Solo hacer la solicitud si hay un stateId
    if (selectedState) {
      fetchCities();
    }
  }, [selectedState, page, rowsPerPage]);

  const handleCountryChange = async (event) => {
    const countryId = event.target.value;
    setSelectedCountry(countryId);

    try {
      const response = await api.get(`/state/${countryId}/selects`);
      setStates(response.data.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }

    // Resetear la selección de estado y ciudades al cambiar el país
    setSelectedState("");
    setCities([]);
  };

  const handleStateChange = async (event) => {
    const stateId = event.target.value;
    setSelectedState(stateId);

    // Resetear la página y la búsqueda al cambiar el estado
    setPage(0);
    setSearchTerm("");
  };

  const handleCreateCity = async () => {
    try {
      const newCityToSend = {
        name: newCityName,
        stateId: parseInt(selectedState),
      };

      await api.post("/city", newCityToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Actualizar la tabla haciendo una nueva solicitud al backend con la paginación actual
      await refreshCities();

      setNewCityName("");
      setCreatingCity(false);
    } catch (error) {
      console.error("Error creating city:", error);
      // Trata el error según sea necesario
    }
  };
  const handleSearch = () => {
    setPage(0);
    refreshCities();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    refreshCities();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    refreshCities();
  };

  // Agregado para búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const refreshCities = async () => {
    try {
      const response = await api.get(`/city/${selectedState}`, {
        params: {
          take: rowsPerPage,
          skip: page * rowsPerPage,
          name: searchTerm,
        },
      });
      setCities(response.data.data);
      setTotalItems(response.data.total);
      setTotalPages(Math.ceil(response.data.total / rowsPerPage));
    } catch (error) {
      console.error("Error refreshing cities:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{t("view_city_title")}</h2>

      <FormControl fullWidth sx={{ marginBottom: 4 }}>
        <InputLabel id="country-select-label">
          {t("view_city_select")}
        </InputLabel>
        <Select
          labelId="country-select-label"
          id="country-select"
          value={selectedCountry}
          onChange={handleCountryChange}
          label={t("view_city_select")}
          sx={{ backgroundColor: "#fff" }}
        >
          <MenuItem value="">
            <em>{t("view_city_none")}</em>
          </MenuItem>
          {countries.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedCountry && (
        <FormControl fullWidth sx={{ marginBottom: 4 }}>
          <InputLabel id="state-select-label">
            {t("view_city_select_2")}
          </InputLabel>
          <Select
            labelId="state-select-label"
            id="state-select"
            value={selectedState}
            onChange={handleStateChange}
            label={t("view_city_select_2")}
            sx={{ backgroundColor: "#fff" }}
          >
            <MenuItem value="">
              <em>{t("view_city_none")}</em>
            </MenuItem>
            {states.map((state) => (
              <MenuItem key={state.id} value={state.id}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {selectedState && (
        <div>
          <h2 className="text-2xl font-bold mb-4">{t("view_city_title")}:</h2>

          <div className="mb-4">
            <TextField
              label={t("view_city_search")}
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              sx={{
                marginBottom: 2,
              }}
            />
          </div>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <TableCell>{t("view_city_name")}</TableCell>
                  <TableCell>{t("view_city_actions")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cities.map((city) => (
                  <TableRow
                    key={city.id}
                    className={`${city.active === 1 ? "" : "bg-red-200"}`}
                  >
                    <TableCell>{city.name}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary">
                        {t("view_city_edit")}
                      </Button>
                      <Button variant="contained" color="secondary">
                        {city.active === 1
                          ? t("view_city_deactivate")
                          : t("view_city_activate")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginación */}
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={totalItems}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">
              {t("view_city_create_new")}
            </h2>
            <div className="flex">
              <TextField
                label={t("view_city_name_1")}
                variant="outlined"
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateCity}
                sx={{ marginLeft: 2 }}
              >
                {t("view_city_create")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NestedSelects;
