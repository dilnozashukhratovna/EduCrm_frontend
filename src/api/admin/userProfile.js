import axiosClient from "@/api/apiClient";

export const userProfile = {
  getUser(id) {
    const url = `user/get-users/${id}`;
    return axiosClient.get(url);
  },
};
