import { defineStore } from "pinia";
import { adminGroup } from "../../api/admin/adminGroup";
export const useGroupStore = defineStore("group", {
  state: () => ({
    groups: null,
    count: null,
    loading: false,
    error: null,
    newGroup: null,
    updatedGroup: null,
    group: null,
    availableRooms: null,
    teachers: [],
    group_id: "",
  }),
  getters: {},
  actions: {
    async getGroups(params) {
      try {
        this.loading = true;
        const res = await adminGroup.getGroups(params);
        this.groups = res.groups;
        console.log("Groups", this.groups);
        this.count = res.count;
        params.last_page = Math.ceil(this.count / params.limit);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async createGroup(payload) {
      try {
        this.loading = true;
        const data = await adminGroup.createGroup(payload);
        this.newGroup = JSON.parse(JSON.stringify(data));
        this.group_id = this.newGroup.group._id;
        console.log("NewGroup:", this.newGroup);
        console.log("Group id:", this.group_id);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async updateGroup(payload, id) {
      try {
        this.loading = true;
        const data = await adminGroup.updateGroup(payload, id);
        this.updatedGroup = JSON.parse(JSON.stringify(data));
        console.log("updatedGroup:", this.updatedGroup);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async deleteGroup(id) {
      try {
        this.loading = true;
        await adminGroup.deleteGroup(id);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async getOneGroup(id) {
      try {
        this.loading = true;
        this.group = await adminGroup.getOneGroup(id);
        console.log("Group from table:", this.group);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async availableAdminRooms(payload) {
      try {
        this.loading = true;
        this.availableRooms = await adminGroup.availableAdminRooms(payload);
        console.log("Available rooms:", this.availableRooms);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log("Error in availableRooms func in store", error);
      } finally {
        this.loading = false;
      }
    },
    async getGroupTeacher(id) {
      try {
        this.loading = true;
        let res = await adminGroup.getGroupTeacher(id);
        this.teachers = res.teachers;
        console.log("Teachers:", this.teachers);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async addGroupTeacher(payload) {
      try {
        this.loading = true;
        await adminGroup.addGroupTeacher(payload);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
