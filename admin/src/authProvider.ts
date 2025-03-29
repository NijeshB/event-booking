import { AuthProvider, fetchUtils } from "react-admin";

const apiUrl = import.meta.env.VITE_API_URL; // Replace with your actual API URL
const httpClient = fetchUtils.fetchJson;

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const response = await httpClient(`${apiUrl}/adminLogin`, {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
      //   credentials: "include",
    });

    if (response.status == 200) {
      const { token } = response.json.data; // ✅ Adjusted to match your API response structure
      localStorage.setItem("token", token);
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },
  checkError: (error) => {
    if (error.status === 401) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve(),
};

export default authProvider;
