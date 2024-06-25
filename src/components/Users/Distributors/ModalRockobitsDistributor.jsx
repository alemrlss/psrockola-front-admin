/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import api from "../../../api/api";
import { useSelector } from "react-redux";

function ModalRockobitsDistributor({ onClose, selectedDistributor }) {
  const user = useSelector((state) => state.auth.user);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleGift = async () => {
    // Lógica para regalar rockobits

    if (amount === "") {
      setError("Amount is required");
      return;
    }

    if (amount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    try {
      await api.post(`/rockobits/gift-distributor`, {
        amount: parseInt(amount),
        idCompany: selectedDistributor.id,
        idAdmin: user.id,
      });
      onClose();
    } catch (error) {
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
        Gift Rockobits to Distributor: <b>{selectedDistributor.name}</b>
      </Typography>
      <TextField
        label="Cantidad"
        type="number"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
          setError("");
        }}
        fullWidth
        sx={{ mt: 2, mb: 2 }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleGift}>
          Regalar
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancelar
        </Button>
      </Box>
      {error && (
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            textAlign: "center",
            color: "red",
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default ModalRockobitsDistributor;
