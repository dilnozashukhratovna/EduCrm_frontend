import axiosClient from "../axios/apiClient";

export const adminGroupStudent = {
  getGroupStudents(params = {}) {
    const url = `group-students/all/q?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },

  createGroupStudent(payload) {
    const url = `groups/add-student`;
    return axiosClient.post(url, payload);
  },

  //   updateGroup(payload, id) {
  //     const url = `groups/update/${id}`;
  //     return axiosClient.put(url, payload);
  //   },

  getSingleGroupLessons(id) {
    const url = `lessons/group/${id}/q?`;
    return axiosClient.get(url);
  },

  updateSingleGroupLesson(lessonId, payload) {
    const url = `lessons/lesson/comment/${lessonId}`;
    return axiosClient.put(url, payload);
  },

  deleteGroupStudent(id) {
    const url = `group-students/delete/${id}`;
    return axiosClient.delete(url);
  },
  //   getOneGroup(id) {
  //     const url = `groups/${id}`;
  //     return axiosClient.get(url);
  //   },
};
