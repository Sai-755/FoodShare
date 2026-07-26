import api from "../api/client";

export const authService = {
  login: (credentials) => api.post("/auth/login", credentials).then((response) => response.data),
  register: (details) => api.post("/auth/register", details).then((response) => response.data),
  me: () => api.get("/auth/me").then((response) => response.data),
};
