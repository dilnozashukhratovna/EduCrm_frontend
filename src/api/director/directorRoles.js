import axiosClient from "../axios/apiClient";

export const directorRoles = {
  getRoles() {
    const url = `roles/all`;
    return axiosClient.get(url);
  },

  createRole(payload) {
    const url = `roles/create-role`;
    return axiosClient.post(url, payload);
  },

  updateRole(payload, id) {
    const url = `roles/update/${id}`;
    return axiosClient.put(url, payload);
  },

  deleteRole(id) {
    const url = `roles/delete/${id}`;
    return axiosClient.delete(url);
  },

  //   getOneRole(id) {
  //     const url = `roles/${id}`;
  //     return axiosClient.get(url);
  //   },
};
