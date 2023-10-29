import axiosClient from "../axios/apiClient";

export const teacherSingleGroup = {
  // getSingleGroup(id) {
  //   const url = `groups/all-students/${id}`;
  //   return axiosClient.get(url);
  // },

  // getSingleGroup(id, params = {}) {
  //   const url = `lessons/group/${id}/q?page=${params.page}&limit=${params.limit}`;
  //   return axiosClient.get(url);
  // },

  getSingleLesson(groupId, date) {
    const url = `groups/attendance/${groupId}`;
    return axiosClient.post(url, {
      date: date,
    });
  },

  updateSingleLesson(payload) {
    const url = `groups/attendance/update/lesson`;
    return axiosClient.post(url, {
      data: payload,
    });
  },

  updateSingleLessonAttendance(id, title) {
    const url = `lessons/lesson/attendance/${id}`;
    return axiosClient.put(url, {
      title: title,
    });
  },

  getStudentsAttendance(id, params = {}) {
    const url = `groups/attendance/${id}/all/q?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },

  getGroupLessons(id, params = {}) {
    const url = `lessons/group/${id}/q?page=${params.page}&limit=${params.limit}`;
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
