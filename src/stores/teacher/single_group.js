import { defineStore } from "pinia";
import { teacherSingleGroup } from "../../api/teacher/teacherSingleGroup";
export const useTeacherSingleGroupStore = defineStore("teacher_single_group", {
  state: () => ({
    single_group: null,
    loading: false,
    error: null,
    updatedGroup: null,
  }),
  getters: {},
  actions: {
    async getTeacherSingleGroup(id) {
      try {
        this.loading = true;
        const res = await teacherSingleGroup.getSingleGroup(id);
        this.single_group = res.groups;
        console.log("TeacherGroups", this.single_group);
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
