/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import api from "../../../api/api";

function ModalMembership({ onClose, selectedDistributor }) {
  const [countryId, setCountryId] = useState(selectedDistributor.country.id);
  const [error, setError] = useState("");
  const [memberships, setMemberships] = useState([]);
  const [selectedMembership, setSelectedMembership] = useState("");

  useEffect(() => {
    // Fetch memberships for the selected company's country
    const fetchMemberships = async () => {
      try {
        const response = await api.get(`distributor-membership/${countryId}`);
        setMemberships(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMemberships();
  }, [countryId]);

  const handleMembershipChange = (event) => {
    setSelectedMembership(event.target.value);
  };

  const handleConfirm = async () => {
    // Send the selected membership to the backend to assign it to the company
    try {
      await api.post(`/distributor-membership/gift/${selectedDistributor.id}`, {
        idMembership: selectedMembership,
      });
      onClose();
    } catch (error) {
      if (error.response.data.message === "DISTRIBUTOR_HAS_ACTIVE_MEMBERSHIP") {
        setError("The distributor already has an active membership");
        return;
      }

      setError("An error occurred (500)");
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "white",
        boxShadow: 0,
        p: 4,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: "center",
        }}
      >
        This modal distributor membership{" "}
      </Typography>
      {selectedDistributor.activeMembership ? (
        <>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: "center",
              color: "red",
            }}
          >
            La empresa tiene la membresía:{" "}
            {selectedDistributor.activeMembership.name}
          </Typography>
          <Select
            value={selectedMembership}
            onChange={handleMembershipChange}
            displayEmpty
            fullWidth
            disabled
          >
            <MenuItem value="" disabled>
              Select a membership
            </MenuItem>
            {memberships.map((membership) => (
              <MenuItem key={membership.id} value={membership.id}>
                {membership.name} - {membership.amount} {membership.currency} /{" "}
                {membership.interval}
              </MenuItem>
            ))}
          </Select>
        </>
      ) : (
        <Select
          value={selectedMembership}
          onChange={handleMembershipChange}
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>
            Select a membership
          </MenuItem>
          {memberships.map((membership) => (
            <MenuItem key={membership.id} value={membership.id}>
              {membership.name} - {membership.amount} {membership.currency} /{" "}
              {membership.interval}
            </MenuItem>
          ))}
        </Select>
      )}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          textAlign: "center",
        }}
      >
        La empresa seleccionada es: {selectedDistributor.name}
      </Typography>
      {error && (
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
          }}
        >
          {error}
        </Typography>
      )}
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button onClick={onClose} sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={selectedDistributor.activeMembership}
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </Box>{" "}
    </Box>
  );
}

export default ModalMembership;
