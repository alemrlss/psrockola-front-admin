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
} from "@mui/material";
import api from "../../../api/api";
import getBenefits from "../../../utils/getBenefits";

function EditMemberships() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [memberships, setMemberships] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState(null);

  const handleEditClick = (membership) => {
    setSelectedMembership(membership);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMembership(null);
    setIsModalOpen(false);
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
        mebershipId: selectedMembership.id,
      };
      const response = await api.patch(`/membership/update`, data);
      console.log(response);
      console.log(data);
    } catch (error) {
      console.error("Error updating membership:", error);
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
      <div className="flex">
        {memberships.map((membership) => (
          <div key={membership.id} className="border border-black p-2 m-2" style={{ marginTop: "20px" }}>
            <p>ID: {membership.id}</p>
            <p>Name: {membership.name}</p>
            <p>
              Price: {membership.amount} {membership.currency}
            </p>
            <p>
              Type: <b>{getBenefits(membership).type}</b>
            </p>
            <Button
              variant="contained"
              onClick={() => handleEditClick(membership)}
            >
              Edit this membership
            </Button>
          </div>
        ))}
      </div>
      {memberships.length === 0 && (
        <p className="text-2xl">No memberships available</p>
      )}

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Edit Membership</DialogTitle>
        <DialogContent>
          {selectedMembership && (
            <>
              <TextField
                label="Name"
                value={selectedMembership.name}
                onChange={(e) =>
                  setSelectedMembership({
                    ...selectedMembership,
                    name: e.target.value,
                  })
                }
                fullWidth
              />
              <TextField
                label="Price"
                value={selectedMembership.amount}
                onChange={(e) =>
                  setSelectedMembership({
                    ...selectedMembership,
                    amount: e.target.value,
                  })
                }
                fullWidth
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditMemberships;
