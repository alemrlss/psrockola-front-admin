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
      <Grid container spacing={2}>
        {memberships.map((membership) => (
          <MembershipCard
            key={membership.id}
            membership={membership}
            onEditClick={handleEditClick}
          />
        ))}
      </Grid>
      {memberships.length === 0 && (
        <p className="text-4xl my-10 text-[#555CB3] font-bold">No memberships available</p>
      )}

      <Dialog open={isModalOpen} onClose={handleCloseModal} sx={{ my: 4 }}>
        <Box>
          <DialogTitle>Edit Membership</DialogTitle>
        </Box>
        <DialogContent>
          {selectedMembership && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveChanges}
            color="primary"
            variant="contained"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditMemberships;
