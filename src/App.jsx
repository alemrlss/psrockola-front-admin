import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login/Login";
import { AuthProvider } from "./auth/AuthProvider";
import Graphics from "./views/Graphics/Graphics";
import Dashboard from "./views/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import ResponsiveDrawer from "./views/Testing/Testing";
import Clients from "./views/Users/Clients/Clients";
import Moderators from "./views/Users/Moderators/Moderators";
import Companies from "./views/Users/Companies/Companies";
import PublicRoute from "./components/Routes/PublicRoute";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import CreateUser from "./views/Users/Create/CreateUser";
import EditMemberships from "./views/Memberships/Edit/EditMemberships";
import Country from "./views/Ubications/Country/Country";
import State from "./views/Ubications/State/State";
import City from "./views/Ubications/City/City";
import Packages from "./views/Packages/Packages";
import Transactions from "./views/Transactions/Transactions";
import ListPackages from "./views/Packages/List/ListPackages";
import DeletedMemberships from "./views/Memberships/Deleted/DeletedMemberships";
import CreateMemberships from "./views/Memberships/Create/Memberships";
import Distributors from "./views/Users/Distributors/Distributors";
import CreateMembershipDistributor from "./views/Memberships/Distributors/Create/CreateMembershipDistributor";
import EditMembershipsDistributor from "./views/Memberships/Distributors/Edit/EditMembershipsDistributor";
import EliminatedMembershipsDistributor from "./views/Memberships/Distributors/Eliminated/EliminatedMembershipsDistributor";
import api from "./api/api";
import { useState } from "react";

function App() {
  const [sessionExpired, setSessionExpired] = useState(false);

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token"); // Elimina el token del localStorage
        localStorage.removeItem("user"); // Elimina el usuario del localStorage
        localStorage.removeItem("tokenExpiration"); // Elimina el tiempo de expiración del localStorage
        setSessionExpired(true);
      }
      return Promise.reject(error);
    }
  );
  return (
    <>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<PublicRoute />}>
            <Route index element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/testing" element={<ResponsiveDrawer />} />
          </Route>

          {/* Rutas protegidas */}
          <Route path="/" element={<ProtectedRoute />}>
            {/* Layout para rutas protegidas */}
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/graphics" element={<Graphics />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/companies/create" element={<CreateMemberships />} />
              <Route path="/companies/edit" element={<EditMemberships />} />
              <Route
                path="/companies/eliminated"
                element={<DeletedMemberships />}
              />
              <Route
                path="/distributors/create-membership"
                element={<CreateMembershipDistributor />}
              />
              <Route
                path="/distributors/edit-membership"
                element={<EditMembershipsDistributor />}
              />
              <Route
                path="/distributors/eliminated-membership"
                element={<EliminatedMembershipsDistributor />}
              />
              <Route path="/users/clients" element={<Clients />} />
              <Route path="/users/companies" element={<Companies />} />
              <Route path="/users/moderators" element={<Moderators />} />
              <Route path="/users/distributors" element={<Distributors />} />
              <Route path="/users/create-user" element={<CreateUser />} />
              <Route path="/ubications/country" element={<Country />} />
              <Route path="/ubications/state" element={<State />} />
              <Route path="/ubications/city" element={<City />} />
              <Route path="/packages/create-package" element={<Packages />} />
              <Route path="/packages/list" element={<ListPackages />} />
              <Route
                path="/users/*"
                element={<div>Page in users not found</div>}
              />
              <Route path="*" element={<div> Page not found</div>} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
      {sessionExpired && (
        <div
          className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-red-500 text-lg mb-4">
              Tu sesion ha expirado, por favor inicia sesion de nuevo
            </h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Ir al Login
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
