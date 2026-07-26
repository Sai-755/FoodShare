import api from "../api/client";

export const donationService = {
  getMyDonations: () => api.get("/donations/my").then((response) => response.data),
  getDonorDashboard: () => api.get("/dashboard/donor").then((response) => response.data),
 getAvailableDonations: async () => {
  const response = await api.get("/donations");
  return response.data.donations || [];
},
  create: (payload) => api.post("/donations", payload).then((response) => response.data),
  uploadImage: (file) => {
    const data = new FormData();
    data.append("image", file);
    return api.post("/upload", data, { headers: { "Content-Type": "multipart/form-data" } }).then((response) => response.data);
  },
};
