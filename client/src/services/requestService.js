import api from "../api/client";

const requestService = {

  createRequest: async (payload) => {
    const response = await api.post("/requests", payload);
    return response.data;
  },

  getMyRequests: async () => {
    const response = await api.get("/requests/my");
    return response.data;
  },

  getReceivedRequests: async () => {
    const response = await api.get("/requests/donor");
    return response.data;
  },

  acceptRequest: async (id) => {
    const response = await api.put(`/requests/${id}/accept`);
    return response.data;
  },

  rejectRequest: async (id) => {
    const response = await api.put(`/requests/${id}/reject`);
    return response.data;
  },

};

export { requestService };
export default requestService;