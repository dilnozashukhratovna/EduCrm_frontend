import axiosClient from "@/api/apiClient";

export const adminStudent = {
  getStudents(params) {
    const url = `admin/get-students/q?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },

  createStudent(payload) {
    const url = `admin/add-student`;
    return axiosClient.post(url, payload);
  },

  updateStudent(payload, id) {
    const url = `admin/update-student/${id}`;
    return axiosClient.put(url, payload);
  },
};
