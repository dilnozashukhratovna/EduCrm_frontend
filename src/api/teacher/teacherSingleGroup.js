import axiosClient from "../axios/apiClient";

export const teacherSingleGroup = {
  getSingleGroup(id) {
    const url = `groups/all-students/${id}`;
    return axiosClient.get(url);
  },

  getStudentsAttendance(id, params) {
    const url = `groups/attendance/${id}/all/q?page=${params.page}&limit=${params.limit}`;
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
