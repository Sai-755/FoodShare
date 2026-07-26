import api from "../api/client";

export const dashboardService = {
  async getDonorDashboard() {
    const { data } = await api.get("/dashboard/donor");
    return data.dashboard;
  },

  async getReceiverDashboard() {
    const { data } = await api.get("/dashboard/receiver");
    return data.dashboard;
  },
};