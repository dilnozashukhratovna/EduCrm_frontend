import axiosClient from "../axios/apiClient";

export const adminGroup = {
  getGroups(params = {}) {
    const url = `groups/all/q?page=${params.page}&limit=${params.limit}`;
    return axiosClient.get(url);
  },

  createGroup(payload) {
    const url = `groups/create-group`;
    return axiosClient.post(url, payload);
  },

  updateGroup(payload, id) {
    const url = `groups/update/${id}`;
    return axiosClient.put(url, payload);
  },

  deleteGroup(id) {
    const url = `groups/delete/${id}`;
    return axiosClient.delete(url);
  },
  getOneGroup(id) {
    const url = `groups/${id}`;
    return axiosClient.get(url);
  },

  availableAdminRooms(payload) {
    const url = `groups/available-rooms`;
    return axiosClient.post(url, payload);
  },

  getGroupTeacher(id) {
    const url = `courses/all-teachers/${id}`;
    return axiosClient.get(url);
  },
  addGroupTeacher(payload) {
    const url = `groups/add-teacher`;
    return axiosClient.post(url, payload);
  },
};
