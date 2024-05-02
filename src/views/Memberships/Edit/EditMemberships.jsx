import { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Switch,
  FormControlLabel,
} from "@mui/material";
import api from "../../../api/api";
import MembershipCard from "../../../components/Membership/MembershipCard";
import ModalEditMembership from "../../../components/Membership/ModalEditMembership";
import ModalDeleteMembership from "../../../components/Membership/ModalDeleteMembership";
import { useTranslation } from "react-i18next";

function EditMemberships() {
  const { t } = useTranslation();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [memberships, setMemberships] = useState([]);

  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(null);

  const [filterInterval, setFilterInterval] = useState("month");

  const handleEditClick = (membership) => {
    setSelectedMembership(membership);
    setIsModalOpenEdit(true);
  };

  const handleDeleteClick = (membership) => {
    setSelectedMembership(membership);
    setIsModalOpenDelete(true);
  };

  const handleCloseModalEdit = () => {
    setSelectedMembership(null);
    setIsModalOpenEdit(false);
  };

  const handleCloseModalDelete = () => {
    setSelectedMembership(null);
    setIsModalOpenDelete(false);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("/country");
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = async (event) => {
    setSelectedCountry(event.target.value);
    try {
      const response = await api.get(`/membership/${event.target.value}`);
      console.log(response.data);
      setMemberships(response.data);
    } catch (error) {
      console.error("Error fetching memberships:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const data = {
        name: selectedMembership.name,
        newAmount: selectedMembership.amount,
        currency: selectedMembership.currency,
        priceId: selectedMembership.price,
        membershipId: selectedMembership.id,
      };
      const response = await api.patch(`/membership/update`, data);

      const updatedMembership = response.data.data;
      const updatedMemberships = memberships.map((membership) =>
        membership.id === updatedMembership.id ? updatedMembership : membership
      );
      setMemberships(updatedMemberships);
      handleCloseModalEdit();
    } catch (error) {
      console.error("Error updating membership:", error);
    }
  };

  const handleDeleteMembership = async () => {
    try {
      await api.patch(`/membership/delete/${selectedMembership.id}`);
      const updatedMemberships = memberships.filter(
        (membership) => membership.id !== selectedMembership.id
      );
      setMemberships(updatedMemberships);
      handleCloseModalDelete();
    } catch (error) {
      console.error("Error deleting membership:", error);
    }
  };
  const filteredMemberships = memberships.filter(
    (membership) => membership.interval === filterInterval
  );
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="country-label">Select Country</InputLabel>
        <Select
          labelId="country-label"
          id="country-select"
          label="Select Country"
          value={selectedCountry}
          onChange={handleCountryChange}
          style={{ minWidth: "200px" }}
        >
          <MenuItem value="" disabled>
            Select a country
          </MenuItem>
          {countries.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="flex items-center">
        <span className="mr-4">{t("monthly_memberships")}</span>{" "}
        {/* Etiqueta "month" */}
        <FormControlLabel
          control={
            <Switch
              checked={filterInterval === "year"}
              onChange={() =>
                setFilterInterval(filterInterval === "year" ? "month" : "year")
              }
              sx={{
                "& .MuiSwitch-thumb": {
                  backgroundColor: "#FFA500",
                },

                "& .MuiSwitch-thumb.Mui-checked": {
                  transform: "translateX(24px)",
                },
              }}
            />
          }
          label="" // No hace falta poner un texto aquí, ya que se manejan por separado.
        />
        <span className="ml-4">{t("yearly_memberships")}</span>{" "}
        {/* Etiqueta "year" */}
      </div>

      {/* Muestra las membresías */}
      <Grid container spacing={2}>
        {filteredMemberships.map((membership) => (
          <MembershipCard
            key={membership.id}
            membership={membership}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </Grid>
      {memberships.length === 0 && (
        <p className="text-4xl my-10 text-[#555CB3] font">
          No memberships available
        </p>
      )}

      <ModalEditMembership
        isModalOpen={isModalOpenEdit}
        handleCloseModal={handleCloseModalEdit}
        selectedMembership={selectedMembership}
        setSelectedMembership={setSelectedMembership}
        handleSaveChanges={handleSaveChanges}
      />
      <ModalDeleteMembership
        isModalOpen={isModalOpenDelete}
        handleCloseModal={handleCloseModalDelete}
        selectedMembership={selectedMembership}
        setSelectedMembership={setSelectedMembership}
        handleDeleteMembership={handleDeleteMembership}
      />
    </div>
  );
}

export default EditMemberships;
