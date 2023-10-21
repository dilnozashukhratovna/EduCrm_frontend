import axiosClient from "@/api/apiClient";

export const adminGroupStudent = {
  getGroupStudents(params) {
    const url = `group-students/all/q?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },

  createGroupStudent(payload) {
    const url = `group-students/add-student`;
    return axiosClient.post(url, payload);
  },

  //   updateGroup(payload, id) {
  //     const url = `groups/update/${id}`;
  //     return axiosClient.put(url, payload);
  //   },

  deleteGroupStudent(id) {
    const url = `group-students/delete/${id}`;
    return axiosClient.delete(url);
  },
  //   getOneGroup(id) {
  //     const url = `groups/${id}`;
  //     return axiosClient.get(url);
  //   },
};