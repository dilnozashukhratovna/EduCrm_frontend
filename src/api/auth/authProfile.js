import axiosClient from "@/api/axios/apiClient";


export const authProfile = {
  getProfile() {
    const url = "profile/info";
    return axiosClient.get(url);
  },

  updateImage(payload) {
    const url = "profile/upload-image";
    return axiosClient.post(url, payload);
  },

  updateProfile(payload) {
    const url = "profile/update";
    return axiosClient.put(url, payload);
  },

  changePassword(payload) {
    const url = "profile/change-password";
    return axiosClient.post(url, payload);
  },
};
