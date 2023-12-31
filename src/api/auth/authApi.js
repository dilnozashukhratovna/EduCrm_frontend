import axiosClient from "@/api/axios/apiClient";

export const authApi = {
  login(payload) {
    const url = "auth/login";
    return axiosClient.post(url, payload);
  },
};
