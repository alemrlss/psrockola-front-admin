import {
  Box,
  List,
  ListItem,
  Typography,
  Button,
  Modal,
  TextField,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../api/api";

function ListPackages() {
  const [packages, setPackages] = useState([]);
  const [currentTab, setCurrentTab] = useState(0); // Estado para manejar la pestaña seleccionada
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [editedPackage, setEditedPackage] = useState(null);
  const [countries, setCountries] = useState([]); // Estado para manejar los países
  const [selectedCountry, setSelectedCountry] = useState(""); // Estado para manejar el país seleccionado

  // Función para cargar los países
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

  // Función para cargar los paquetes según la pestaña seleccionada y el país
  useEffect(() => {
    if (selectedCountry) {
      loadPackages();
    }
  }, [currentTab, selectedCountry]);

  const loadPackages = async () => {
    // Determina el endpoint a usar según la pestaña seleccionada
    const endpoint =
      currentTab === 0
        ? `package-rockobits/companies/${selectedCountry}`
        : `package-rockobits/distributors/${selectedCountry}`;
    try {
      const response = await api.get(endpoint);
      setPackages(response.data.data);
    } catch (error) {
      console.error("Error al cargar los Packages:", error);
    }
  };

  const openEditModal = (pkg) => {
    setEditedPackage(pkg);
    setOpenModalEdit(true);
  };

  const closeEditModal = () => {
    setOpenModalEdit(false);
  };

  const openDeleteModal = (pkg) => {
    setEditedPackage(pkg);
    setOpenModalDelete(true);
  };

  const closeDeleteModal = () => {
    setOpenModalDelete(false);
  };

  const handlePackageFieldChange = (field, value) => {
    setEditedPackage({
      ...editedPackage,
      [field]: value,
    });
  };

  const saveChanges = async () => {
    try {
      const response = await api.patch(
        `package-rockobits/${editedPackage.id}`,
        editedPackage
      );
      const updatedPackages = packages.map((pkg) =>
        pkg.id === editedPackage.id ? response.data.data : pkg
      );
      setPackages(updatedPackages);
      closeEditModal();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const saveChangesDelete = async () => {
    try {
      await api.patch(`package-rockobits/delete/${editedPackage.id}`);
      const updatedPackages = packages.filter(
        (pkg) => pkg.id !== editedPackage.id
      );
      setPackages(updatedPackages);
      closeDeleteModal();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  return (
    <Box mt={4} bgcolor="background.paper">
      <Typography variant="h4" gutterBottom>
        Packages Available
      </Typography>

      {/* Barra de pestañas */}
      <Tabs
        value={currentTab}
        onChange={(e, newValue) => setCurrentTab(newValue)}
      >
        <Tab label="Companies" />
        <Tab label="Distributors" />
      </Tabs>

      {/* Selector de país */}
      {(currentTab === 0 || currentTab === 1) && (
        <FormControl fullWidth margin="normal">
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            id="country"
            name="country"
            label="Country"
            onChange={(e) => setSelectedCountry(e.target.value)}
            value={selectedCountry}
            required
          >
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Lista de paquetes */}
      <List>
        {packages.map((pkg, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 2,
              margin: 1,
              borderRadius: 1,
              backgroundColor: "#f5f5f5",
              boxShadow: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              {pkg.name}
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
              Amount: {pkg.rockobitsAmount} RB
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
              Price: {pkg.price / 100} USD
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => openEditModal(pkg)}
                sx={{ fontWeight: "bold" }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => openDeleteModal(pkg)}
                sx={{ fontWeight: "bold" }}
              >
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>

      {/* Modal de edición */}
      <Modal open={openModalEdit} onClose={closeEditModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Package
          </Typography>
          <TextField
            label="Name"
            value={editedPackage ? editedPackage.name : ""}
            onChange={(e) => handlePackageFieldChange("name", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Amount (RB)"
            value={editedPackage ? editedPackage.rockobitsAmount : ""}
            onChange={(e) =>
              handlePackageFieldChange(
                "rockobitsAmount",
                parseInt(e.target.value)
              )
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price (USD)"
            value={editedPackage ? editedPackage.price / 100 : ""}
            onChange={(e) =>
              handlePackageFieldChange("price", e.target.value * 100)
            }
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={saveChanges}>
            Save Changes
          </Button>
        </Box>
      </Modal>

      {/* Modal de Eliminacion */}
      <Modal open={openModalDelete} onClose={closeDeleteModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Delete Package
          </Typography>
          <Typography variant="h6" gutterBottom>
            Are you sure you want to delete this package?
          </Typography>
          <Button variant="contained" onClick={saveChangesDelete}>
            Delete
          </Button>
          <Button variant="contained" onClick={closeDeleteModal}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default ListPackages;
