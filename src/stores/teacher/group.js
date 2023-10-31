import { defineStore } from "pinia";
import { teacherGroups } from "../../api/teacher/teacherGroup";
export const useTeacherGroupStore = defineStore("teacher_group", {
  state: () => ({
    groups: null,
    count: null,
    loading: false,
    error: null,
    newGroup: null,
    updatedGroup: null,
    group: null,
  }),
  getters: {},
  actions: {
    async getTeacherGroups(id) {
      try {
        this.loading = true;
        const res = await teacherGroups.getGroups(id);
        this.groups = res.groups.filter((item) => {
          if (item != null) return item;
        });
        console.log("TeacherGroups", this.groups);
        this.loading = false;
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      }
    },
    // async createTeacherGroup(payload) {
    //   try {
    //     this.loading = true;
    //     const data = await teacherTeacherGroup.createTeacherGroup(payload);
    //     this.newTeacherGroup = JSON.parse(JSON.stringify(data));
    //     console.log("NewTeacherGroup:", this.newTeacherGroup);
    //   } catch (error) {
    //     this.error = error?.response?.data?.message
    //       ? error?.response?.data?.message
    //       : error.message;
    //     console.log(error);
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    // async updateTeacherGroup(payload, id) {
    //   try {
    //     this.loading = true;
    //     const data = await teacherTeacherGroup.updateTeacherGroup(payload, id);
    //     this.updatedTeacherGroup = JSON.parse(JSON.stringify(data));
    //     console.log("updatedTeacherGroup:", this.updatedTeacherGroup);
    //   } catch (error) {
    //     this.error = error?.response?.data?.message
    //       ? error?.response?.data?.message
    //       : error.message;
    //     console.log(error);
    //   } finally {
    //     this.loading = false;
    //   }
    // },

    // async deleteTeacherGroup(id) {
    //   try {
    //     this.loading = true;
    //     await teacherTeacherGroup.deleteTeacherGroup(id);
    //   } catch (error) {
    //     this.error = error?.response?.data?.message
    //       ? error?.response?.data?.message
    //       : error.message;
    //     console.log(error);
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    // async getOneTeacherGroup(id) {
    //   try {
    //     this.loading = true;
    //     this.group = await teacherTeacherGroup.getOneTeacherGroup(id);
    //     console.log("TeacherGroup from table:", this.group);
    //   } catch (error) {
    //     this.error = error?.response?.data?.message
    //       ? error?.response?.data?.message
    //       : error.message;
    //     console.log(error);
    //   } finally {
    //     this.loading = false;
    //   }
    // },
  },
});
