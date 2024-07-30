/* eslint-disable no-useless-catch */
import api from "../api/api";

// features/auth/authService.js
const authService = {
  async login(credentials) {
    try {
      const response = await api.post("auth/login-admin", {
        email: credentials.email,
        password: credentials.password,
      });

      if (response.status === 201) {
        return {
          user: {
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            type: response.data.user.type,
            balance: response.data.user.balance,
            address: response.data.user.address,
            postalCode: response.data.user.postalCode,
            phone: response.data.user.phone,
            photo: response.data.user.photo,
            language: response.data.user.language,
          },
          token: response.data.token,
          tokenExpiration: response.data.tokenExpiration,
        };
      } else {
        throw new Error("Error during login");
      }
    } catch (error) {
      //TODO - Handle error
      console.log(error.response.data);
      if (error.response && error.response.data) {
        console.log(error.response.data.message);
      } else {
        throw new Error("Connection error, try again later");
      }
    }
  },
};

export default authService;
