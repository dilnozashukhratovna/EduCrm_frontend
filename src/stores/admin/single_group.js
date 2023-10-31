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
    group_lessons: [],
    single_group_students: null,
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
        const data = await adminGroupStudent.createGroupStudent(payload);
        this.newGroupStudent = JSON.parse(JSON.stringify(data));
        console.log("NewGroupStudent:", this.newGroupStudent);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
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
        await adminGroupStudent.deleteGroupStudent(id);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      }
    },

    async getSingleGroupLessons(id) {
      try {
        let res = await adminGroupStudent.getSingleGroupLessons(id);
        this.group_lessons = res.lessons;
        console.log("Single Group lessons:", this.group_lessons);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      }
    },
    async getSingleGroupStudents(id) {
      try {
        let res = await adminGroupStudent.getSingleGroupStudents(id);
        this.single_group_students = res;
        console.log("Single Group students:", this.single_group_students);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      }
    },

    async updateSingleGroupLesson(lessonId, payload) {
      try {
        let res = await adminGroupStudent.updateSingleGroupLesson(
          lessonId,
          payload
        );
        // this.group_lessons = res.lessons;
        console.log("Updated group lesson:", res);
        location.reload();
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      }
    },
    async updateSingleGroupStudent(lessonId, payload) {
      try {
        let res = await adminGroupStudent.updateSingleGroupStudent(
          lessonId,
          payload
        );
        console.log("Updated group student:", res);
        // location.reload();
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      }
    },
  },
});
