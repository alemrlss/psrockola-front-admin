import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  TablePagination,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import api from "../../../api/api";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function Country() {
  const { t } = useTranslation();
  const token = useSelector((state) => state.auth.token);
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState({
    isoCode: "",
    phoneCode: "",
    name: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  // Paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  const [isModalOpenEdit, setModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setModalOpenDelete] = useState(false);
  const [editCountry, setEditCountry] = useState({
    isoCode: "",
    phoneCode: "",
    name: "",
  });

  const handleOpenModal = () => {
    setModalOpenEdit(true);
  };

  const handleCloseModal = () => {
    setModalOpenEdit(false);
  };
  const handleOpenModalDelete = (country) => {
    setEditCountry(country);
    setModalOpenDelete(true);
  };

  const handleCloseModalDelete = () => {
    setModalOpenDelete(false);
  };

  const handleOpenEditModal = (country) => {
    setEditCountry(country);
    handleOpenModal();
  };

  const fetchCountries = async () => {
    try {
      const response = await api.get(
        `/country?take=${rowsPerPage}&skip=${
          page * rowsPerPage
        }&name=${searchQuery}`
      );
      setCountries(response.data.data);
      setTotalItems(response.data.total);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchCountries();
    }
  };

  const handleChange = (e) => {
    setSuccess(null);
    setError(null);
    const { name, value } = e.target;
    setNewCountry((prevCountry) => ({
      ...prevCountry,
      [name]: value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCountry((prevCountry) => ({
      ...prevCountry,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post("/country", newCountry, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCountries((prevCountries) => [...prevCountries, response.data.data]);
      setNewCountry({ isoCode: "", phoneCode: "", name: "" });
      setSuccess("Country created successfully");
    } catch (error) {
      console.error("Error creating country:", error);
      setError("Error creating country");
    } finally {
      setLoading(false);
      fetchCountries();
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.patch(
        `/country/${editCountry.id}`,
        editCountry,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCountries((prevCountries) =>
        prevCountries.map((country) =>
          country.id === editCountry.id ? response.data.data : country
        )
      );
      handleCloseModal();
      fetchCountries();
    } catch (error) {
      console.error("Error updating country:", error);
      setError("Error updating country");
    }
  };

  const handleToggleCountry = async (id) => {
    try {
      setLoading(true);
      const country = countries.find((country) => country.id === id);
      const newState = country.active === 1 ? 0 : 1;
      await api.put(`/country/${id}`);
      setCountries((prevCountries) =>
        prevCountries.map((country) =>
          country.id === id ? { ...country, active: newState } : country
        )
      );
    } catch (error) {
      console.error("Error changing country state:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {t("view_ubications_countries_title")}:
      </h2>
      <TextField
        label="Buscar por nombre"
        value={searchQuery}
        onChange={handleChangeSearch}
        onKeyUp={handleEnterKeyPress}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("view_ubications_countries_table_iso")}</TableCell>
              <TableCell>{t("view_ubications_countries_table_name")}</TableCell>
              <TableCell>
                {t("view_ubications_countries_table_phoneCode")}
              </TableCell>
              <TableCell>
                {t("view_ubications_countries_table_active")}
              </TableCell>
              <TableCell>
                {t("view_ubications_countries_table_actions")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map((country) => (
              <TableRow
                key={country.id}
                className={`${country.active === 1 ? "" : "bg-red-200"}`}
              >
                <TableCell>{country.isoCode}</TableCell>
                <TableCell>{country.name}</TableCell>
                <TableCell>{country.phoneCode}</TableCell>
                <TableCell>
                  {country.active === 1
                    ? t("view_ubications_countries_active_yes")
                    : t("view_ubications_countries_active_no")}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenEditModal(country)}>
                    Editar
                  </Button>
                  <Button
                    sx={{ color: "red" }}
                    onClick={() => handleOpenModalDelete(country)}
                  >
                    {country.active === 1 ? "Desactivar" : "Activar"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalItems}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          {t("view_ubications_countries_create")}
        </h2>
        <div className="max-w-md">
          <form onSubmit={handleSubmit}>
            <TextField
              label={t("view_ubications_countries_table_iso")}
              name="isoCode"
              value={newCountry.isoCode}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label={t("view_ubications_countries_table_phoneCode")}
              name="phoneCode"
              value={newCountry.phoneCode}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label={t("view_ubications_countries_table_name")}
              name="name"
              value={newCountry.name}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              {t("view_ubications_countries_create_btn")}
            </Button>
          </form>
          {loading && <p>{t("view_ubications_countries_create_btn_loader")}</p>}
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
        </div>
      </div>
      <Modal open={isModalOpenEdit} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "white",
            boxShadow: 0,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {t("view_ubications_countries_create_btn_edit")}
          </Typography>
          <div>
            {editCountry && (
              <form onSubmit={handleEditSubmit}>
                <TextField
                  label={t("view_ubications_countries_table_iso")}
                  name="isoCode"
                  value={editCountry.isoCode}
                  onChange={handleEditChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label={t("view_ubications_countries_table_phoneCode")}
                  name="phoneCode"
                  value={editCountry.phoneCode}
                  onChange={handleEditChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label={t("view_ubications_countries_table_name")}
                  name="name"
                  value={editCountry.name}
                  onChange={handleEditChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                  {t("view_ubications_countries_edit")}
                </Button>
              </form>
            )}
          </div>
        </Box>
      </Modal>
      <Modal open={isModalOpenDelete} onClose={handleCloseModalDelete}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "white",
            boxShadow: 0,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {t("view_ubications_desactive")}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {t("view_ubications_message")}
          </Typography>
          <Button
            onClick={handleCloseModalDelete}
            variant="contained"
            color="primary"
          >
            {t("view_ubications_cancel")}
          </Button>
          <Button
            onClick={() => {
              handleCloseModalDelete();
              handleToggleCountry(editCountry.id);
            }}
            variant="contained"
            color="secondary"
          >
            {editCountry.active === 1 ? t("view_ubicactions_deactivate") : t("view_ubications_active")}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Country;
