/* eslint-disable react/prop-types */
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import api from "../../../api/api";

const CreateModeradorForm = ({ countries, setCountries }) => {
  const [userObject, setUserObject] = useState({
    name: "",
    countryId: 0,
    country: "",
    state: "",
    city: "",
    address: "",
    phone: "",
    postalCode: "",
    password: "",
    email: "",
    logo: null,
    type: 18,
    codePhone: "+58",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (event) => {
    setMessage({ text: "", type: "" });
    const { name, value } = event.target;
    setUserObject((prevUserObject) => ({
      ...prevUserObject,
      [name]: value,
    }));

    if (name === "country") {
      setUserObject((prevUserObject) => ({
        ...prevUserObject,
        stateId: 0,
        cityId: 0,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !userObject.name ||
      !userObject.address ||
      !userObject.email ||
      !userObject.password ||
      !userObject.phone ||
      !userObject.postalCode ||
      !userObject.country
    ) {
      setMessage({
        text: "Por favor, complete todos los campos obligatorios.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    if (!emailRegex.test(userObject.email)) {
      setMessage({
        text: "Por favor, ingrese un correo electrónico válido.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    if (userObject.password.length < 6) {
      setMessage({
        text: "La contraseña debe tener al menos 6 caracteres.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    const updatedUserObject = {
      ...userObject,
      cityId: parseInt(userObject.city),
      countryId: parseInt(userObject.country),
      stateId: parseInt(userObject.state),
    };

    const dataToSend = {
      name: updatedUserObject.name,
      address: updatedUserObject.address,
      phone: updatedUserObject.phone,
      postalCode: updatedUserObject.postalCode,
      password: updatedUserObject.password,
      email: updatedUserObject.email,
      logo: updatedUserObject.logo,
      birthDate: updatedUserObject.birthDate,
      type: updatedUserObject.type,
      codePhone: updatedUserObject.codePhone,
      cityId: updatedUserObject.cityId,
      countryId: updatedUserObject.countryId,
      stateId: updatedUserObject.stateId,
    };

    try {
      const response = await api.post("/auth/register", dataToSend);
      setMessage({ text: "Moderador creado con éxito", type: "success" });
      setUserObject({
        name: "",
        countryId: "",
        cityId: "",
        stateId: "",
        address: "",
        phone: "",
        postalCode: "",
        password: "",
        email: "",
        logo: "logo-example.png",
        birthDate: "",
        type: 18,
        codePhone: "+58",
      });
      setCountries([]);
    } catch (error) {
      setMessage({ text: error.response.data.message, type: "error" });
      console.error("Error al registrar usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="mx-auto p-6 bg-white shadow-md rounded-md"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-center m-2">
        <div className="w-1/2">
          <h2 className="text-center text-[#555CB3] text-2xl font-bold ">
            Create Moderador
          </h2>
        </div>
        <Grid item xs={12} className="w-1/2">
          {message.text && (
            <div
              className={`text-center text-lg p-2 mt-2 rounded-sm  ${
                message.type === "success"
                  ? "text-green-500 font-bold"
                  : "text-red-500 font-bold"
              }`}
            >
              {message.text}
            </div>
          )}
        </Grid>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            size="small"
            name="name"
            value={userObject.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            size="small"
            name="address"
            value={userObject.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            size="small"
            name="phone"
            value={userObject.phone}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Postal Code"
            variant="outlined"
            fullWidth
            size="small"
            name="postalCode"
            value={userObject.postalCode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            size="small"
            name="password"
            value={userObject.password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            size="small"
            name="email"
            value={userObject.email}
            onChange={handleChange}
          />
        </Grid>

    
        <Grid item xs={6}>
          <TextField
            label="Country"
            variant="outlined"
            fullWidth
            size="small"
            name="country"
            value={userObject.country}
            onChange={handleChange}
            select
          >
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              height: "40px",
              backgroundColor: "#F66E0C",
              color: "white",
              "&:hover": {
                backgroundColor: "#D35400",
              },
            }}
          >
            {loading ? "Loading..." : "Create"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateModeradorForm;
