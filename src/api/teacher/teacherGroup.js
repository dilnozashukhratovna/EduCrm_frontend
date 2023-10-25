import axiosClient from "../axios/apiClient";

export const teacherGroups = {
  getGroups(id) {
    const url = `teachers/get-groups/${id}`;
    return axiosClient.get(url);
  },

  //   createGroup(payload) {
  //     const url = `groups/create-group`;
  //     return axiosClient.post(url, payload);
  //   },

  //   updateGroup(payload, id) {
  //     const url = `groups/update/${id}`;
  //     return axiosClient.put(url, payload);
  //   },

  //   deleteGroup(id) {
  //     const url = `groups/delete/${id}`;
  //     return axiosClient.delete(url);
  //   },

  //   getOneGroup(id) {
  //     const url = `groups/${id}`;
  //     return axiosClient.get(url);
  //   },
};
