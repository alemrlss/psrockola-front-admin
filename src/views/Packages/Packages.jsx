import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../api/api';

function Packages() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [packages, setPackages] = useState([]);

  // Función para cargar los Packages al cargar el componente
  useEffect(() => {
    loadPackages();
  }, []);

  // Función para cargar los Packages
  const loadPackages = async () => {
    try {
      const response = await api.get('package-rockobits');
      setPackages(response.data.data);
    } catch (error) {
      console.error('Error al cargar los Packages:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convertir el precio a centavos
    const priceInCents = parseFloat(price) * 100;

    try {
      // Realizar la solicitud al backend para crear el Package
      const response = await api.post('package-rockobits', {
        name,
        currency: 'USD',
        amount: parseFloat(amount),
        price: priceInCents,
      });

      // Limpiar los campos después de crear el Package
      setName('');
      setAmount('');
      setPrice('');
      setErrorMessage('');

      // Volver a cargar los Packages después de crear uno nuevo
      loadPackages();
      
      // Manejar la respuesta del servidor aquí si es necesario

    } catch (error) {
      // Manejar errores de la solicitud
      console.error('Error al crear el Package:', error);
      setErrorMessage('Error al crear el Package. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className=" mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Crear Package</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Package:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Monto:</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio:</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <button
          type="submit"
          className="w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Crear Package
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Packages Disponibles</h2>
        <ul>
          {packages.map((pkg, index) => (
            <li key={index} className="mb-2">Nombre: {pkg.name} - Monto(RB):{pkg.rockobitsAmount} - Precio:{pkg.price/100} usd</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Packages;
