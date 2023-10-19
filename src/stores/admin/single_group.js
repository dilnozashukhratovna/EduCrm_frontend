import { defineStore } from "pinia";
import { adminGroupStudent } from "../../api/admin/adminSingleGroup";
export const useGroupStudentStore = defineStore("group_student", {
  state: () => ({
    group_students: null,
    count: null,
    loading: false,
    error: null,
    newGroupStudent: null,
    updatedGroupStudent: null,
    group_student: null,
  }),
  getters: {},
  actions: {
    async getGroupStudents(params) {
      try {
        this.loading = true;
        const res = await adminGroupStudent.getGroupStudents(params);
        this.group_students = res.group_students;
        console.log("GroupStudents", this.group_students);
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
    async createGroupStudent(payload) {
      try {
        this.loading = true;
        const data = await adminGroupStudent.createGroupStudent(payload);
        this.newGroupStudent = JSON.parse(JSON.stringify(data));
        console.log("NewGroupStudent:", this.newGroupStudent);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    // async updateGroupStudent(payload, id) {
    //   try {
    //     this.loading = true;
    //     const data = await adminGroupStudent.updateGroupStudent(payload, id);
    //     this.updatedGroupStudent = JSON.parse(JSON.stringify(data));
    //     console.log("updatedGroupStudent:", this.updatedGroupStudent);
    //   } catch (error) {
    //     this.error = error?.response?.data?.message
    //       ? error?.response?.data?.message
    //       : error.message;
    //     console.log(error);
    //   } finally {
    //     this.loading = false;
    //   }
    // },

    async deleteGroupStudent(id) {
      try {
        this.loading = true;
        await adminGroupStudent.deleteGroupStudent(id);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    // async getOneGroupStudent(id) {
    //   try {
    //     this.loading = true;
    //     this.group_student = await adminGroupStudent.getOneGroupStudent(id);
    //     console.log("GroupStudent from table:", this.group_student);
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
