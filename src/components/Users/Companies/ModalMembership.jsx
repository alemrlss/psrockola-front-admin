/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import api from "../../../api/api";
import { formatDate } from "../../../utils/formatDate";

function ModalMembership({ onClose, selectedCompany }) {
  const [countryId, setCountryId] = useState(selectedCompany.country.id);
  const [error, setError] = useState("");
  const [memberships, setMemberships] = useState([]);
  const [selectedMembership, setSelectedMembership] = useState("");
  const [expirationDateMembership, setExpirationDateMembership] = useState(
    selectedCompany.membershipExpirationDate
  );

  //constante para ver si la membresia de la compañia esta vencida
  const isExpired = expirationDateMembership < new Date().toISOString();

  // solo se podran habilitar el select y boton cuando una membresia este vencida o no tenga ninguna membresia.

  useEffect(() => {
    // Fetch memberships for the selected company's country
    const fetchMemberships = async () => {
      try {
        const response = await api.get(`/membership/${countryId}`);
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
      await api.post(`/membership/gift/${selectedCompany.id}`, {
        idMembership: selectedMembership,
      });
      onClose();
    } catch (error) {
      if (error.response.data.message === "USER_HAS_ACTIVE_MEMBERSHIP") {
        setError("The user already has an active membership");
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
        Elige la membresía que le vas a asignar a la empresa
      </Typography>

      {selectedCompany.activeMembership ? (
        <>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: "center",
              color: isExpired ? "red" : "green",
            }}
          >
            La empresa tiene la membresía:{" "}
            {selectedCompany.activeMembership.name}
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: "center",
              color: isExpired ? "red" : "green",
              fontSize: "10px",
            }}
          >
            La membresía vence el: {formatDate(expirationDateMembership)}
          </Typography>

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
        La empresa seleccionada es: {selectedCompany.name}
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
          onClick={handleConfirm}
          disabled={!selectedMembership}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
}

export default ModalMembership;
