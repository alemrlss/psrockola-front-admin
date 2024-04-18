import {
  Box,
  List,
  ListItem,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../api/api";

function ListPackages() {
  const [packages, setPackages] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false); // Estado para controlar si el modal está abierto
  const [openModalDelete, setOpenModalDelete] = useState(false); // Estado para controlar si el modal está abierto
  const [editedPackage, setEditedPackage] = useState(null); // Estado para almacenar el paquete que se está editando

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

  // Función para abrir el modal de edición
  const openEditModalEdit = (pkg) => {
    setEditedPackage(pkg);
    setOpenModalEdit(true);
  };

  // Función para cerrar el modal de edición
  const closeEditModal = () => {
    setOpenModalEdit(false);
  };
  // Función para abrir el modal de eliminacion
  const openDeleteModal = (pkg) => {
    setEditedPackage(pkg);
    setOpenModalDelete(true);
  };

  // Función para cerrar el modal de eliminacion
  const closeDeleteModal = () => {
    setOpenModalDelete(false);
  };

  // Función para manejar cambios en los campos del paquete editado
  const handlePackageFieldChange = (field, value) => {
    setEditedPackage({
      ...editedPackage,
      [field]: value,
    });
  };

  // Función para guardar los cambios del paquete editado
  const saveChanges = async () => {
    try {
      const response = await api.patch(
        `package-rockobits/${editedPackage.id}`,
        editedPackage
      );

      // Actualizar la lista de paquetes
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
      // Actualizar la lista de paquetes
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
            {/* Botón para editar */}
            <Button variant="outlined" onClick={() => openEditModalEdit(pkg)}>
              Edit
            </Button>
            <Button variant="outlined" onClick={() => openDeleteModal(pkg)}>
              Delete
            </Button>
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
