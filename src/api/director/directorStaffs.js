import axiosClient from "../axios/apiClient";

export const directorStaffs = {
  getStaffs(params = {}) {
    const url = `director/get-staffs/q?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },

  //   getStaffs(params) {
  //     const url = `get-staffs`;
  //     return axiosClient.get(url, params);
  //   },

  createStaff(payload) {
    const url = `director/add-staff`;
    return axiosClient.post(url, payload);
  },

  //   updateCourse(payload, id) {
  //     const url = `courses/update/${id}`;
  //     return axiosClient.put(url, payload);
  //   },

  //   deleteCourse(id) {
  //     const url = `courses/delete/${id}`;
  //     return axiosClient.delete(url);
  //   },
  //   getOneCourse(id) {
  //     const url = `courses/${id}`;
  //     return axiosClient.get(url);
  //   },
};
