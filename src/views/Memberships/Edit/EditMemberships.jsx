import { useState, useEffect } from "react";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import api from "../../../api/api";
import getBenefits from "../../../utils/getBenefits";
import MembershipCard from "../../../components/Membership/MembershipCard";
import ModalEditMembership from "../../../components/Membership/ModalEditMembership";
import ModalDeleteMembership from "../../../components/Membership/ModalDeleteMembership";

function EditMemberships() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [memberships, setMemberships] = useState([]);

  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(null);

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

      {/* Muestra las membresías */}
      <Grid container spacing={2}>
        {memberships.map((membership) => (
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
