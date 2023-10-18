import axiosClient from "@/api/apiClient";

export const adminCourse = {
  getCourses(params) {
    const url = `courses/all/q?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },

  createCourse(payload) {
    const url = `courses/create-course`;
    return axiosClient.post(url, payload);
  },

  updateCourse(payload, id) {
    const url = `courses/update/${id}`;
    return axiosClient.put(url, payload);
  },

  deleteCourse(id) {
    const url = `courses/delete/${id}`;
    return axiosClient.delete(url);
  },
  getOneCourse(id) {
    const url = `courses/${id}`;
    return axiosClient.get(url);
  },
};
