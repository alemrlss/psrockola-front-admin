// api.js
import axios from "axios";

// develop: http://localhost:5000/api
// production: https://psrockola-backend-develop.onrender.com/api

const api = axios.create({
  baseURL: "https://psrockola-backend-develop.onrender.com/api", // Reemplaza con la URL de tu servidor NestJS
  timeout: 5000, // Tiempo máximo de espera para las solicitudes
  headers: {
    "Content-Type": "application/json",
    // Puedes agregar otros encabezados aquí según tus necesidades
  },
});

export default api;
