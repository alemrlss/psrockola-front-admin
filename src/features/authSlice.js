// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Función de verificación al cargar la aplicación
const checkAuthentication = () => {
  const token = localStorage.getItem("token");
  return !!token;
};
//s

const checkInitialUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const loginAdmin = createAsyncThunk(
  "auth/loginADmin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem("token", response.token);
      localStorage.setItem("tokenExpiration", response.tokenExpiration);
      localStorage.setItem("user", JSON.stringify(response.user));
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Error during login");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: checkInitialUser(),
    token: localStorage.getItem("token"),
    tokenExpiration: null,
    isAuthenticated: checkAuthentication(),
    status: "idle",
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null; // Funcion para limpiar el Error del Auth.
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setTokenExpiration: (state, action) => {
      state.tokenExpiration = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.tokenExpiration = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("user");
    },

    updateUser: (state, action) => {
      if (state.user) {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.tokenExpiration = action.payload.tokenExpiration;
        state.isAuthenticated = true; // Autenticado después del inicio de sesión exitoso
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error during login";
        state.isAuthenticated = false; // Restablecer la autenticación en caso de error
      });
  },
});

export const {
  setUser,
  setToken,
  setTokenExpiration,
  logout,
  clearError,
  updateUser,
} = authSlice.actions;
export default authSlice.reducer;
