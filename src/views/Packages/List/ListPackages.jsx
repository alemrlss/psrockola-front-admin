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
import { useTranslation } from "react-i18next";

function ListPackages() {
  const [packages, setPackages] = useState([]);
  const [currentTab, setCurrentTab] = useState(0); // Estado para manejar la pestaña seleccionada
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [editedPackage, setEditedPackage] = useState(null);
  const [countries, setCountries] = useState([]); // Estado para manejar los países
  const [selectedCountry, setSelectedCountry] = useState(""); // Estado para manejar el país seleccionado

  const { t } = useTranslation();

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
        {t("view_package_list_title")}
      </Typography>

      {/* Barra de pestañas */}
      <Tabs
        value={currentTab}
        onChange={(e, newValue) => setCurrentTab(newValue)}
      >
        <Tab label={t("view_packages_create_companies")} />
        <Tab label={t("view_packages_create_distributors")} />
      </Tabs>

      {/* Selector de país */}
      {(currentTab === 0 || currentTab === 1) && (
        <FormControl fullWidth margin="normal">
          <InputLabel id="country-label">
            {t("view_packages_create_country")}
          </InputLabel>
          <Select
            labelId="country-label"
            id="country"
            name="country"
            label={t("view_packages_create_country")}
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
              {t("view_packages_create_amount")}: {pkg.rockobitsAmount}
            </Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>
              {t("view_packages_create_price")}: {pkg.price / 100} USD
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => openEditModal(pkg)}
                sx={{ fontWeight: "bold" }}
              >
                {t("view_package_list_edit")}
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => openDeleteModal(pkg)}
                sx={{ fontWeight: "bold" }}
              >
                {t("view_package_list_delete")}
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
            {t("view_package_list_edit_package")}
          </Typography>
          <TextField
            label={t("view_packages_create_name")}
            value={editedPackage ? editedPackage.name : ""}
            onChange={(e) => handlePackageFieldChange("name", e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label={t("view_packages_create_amount")}
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
            label={t("view_packages_create_price")}
            value={editedPackage ? editedPackage.price / 100 : ""}
            onChange={(e) =>
              handlePackageFieldChange("price", e.target.value * 100)
            }
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={saveChanges}>
            {t("view_package_list_edit_save")}
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
            {t("view_package_list_title_modal")}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {t("view_package_list_message")}
          </Typography>
          <Button variant="contained" onClick={saveChangesDelete}>
            {t("view_package_list_title_modal_delete")}
          </Button>
          <Button variant="contained" onClick={closeDeleteModal}>
          {t("view_package_list_title_modal_cancel")}

          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default ListPackages;
