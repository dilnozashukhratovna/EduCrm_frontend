import { defineStore } from "pinia";
import { teacherSingleGroup } from "../../api/teacher/teacherSingleGroup";
export const useTeacherSingleGroupStore = defineStore("teacher_single_group", {
  state: () => ({
    group_students: [],
    loading: false,
    error: null,
    updatedGroup: null,
    attendance: null,
  }),
  getters: {},
  actions: {
    async getTeacherSingleGroup(id) {
      try {
        this.loading = true;
        const res = await teacherSingleGroup.getSingleGroup(id);
        // for (let index = 0; index < res.students.length; index++) {
        //   const element = res.students[index];
        //   if (element !== null) {
        //     this.group_students.push(element);
        //   }
        // }
        this.group_students = res.students.filter(
          (item) => item && item.first_name
        );
        console.log("TeacherGroups", this.group_students);
        this.loading = false;
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      }
    },
    async getStudentsAttendance(id, params) {
      try {
        this.loading = true;
        const res = await teacherSingleGroup.getStudentsAttendance(id, params);
        this.attendance = res
        console.log("Students attendance:", res);
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
