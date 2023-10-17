import { defineStore } from "pinia";
import { adminStudent } from "../../api/admin/adminStudent";
export const useStudentStore = defineStore("student", {
  state: () => ({
    students: null,
    count: null,
    loading: false,
    error: null,
    newStudent: null,
    updatedStudent: null,
    student: null,
  }),
  getters: {},
  actions: {
    async getStudents(params) {
      try {
        this.loading = true;
        const res = await adminStudent.getStudents(params);
        this.students = res.students;
        console.log("Students", this.students);
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
    async createStudent(payload) {
      try {
        this.loading = true;
        const data = await adminStudent.createStudent(payload);
        this.newStudent = JSON.parse(JSON.stringify(data));
        console.log("NewStudent:", this.newStudent);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async updateStudent(payload, id) {
      try {
        this.loading = true;
        const data = await adminStudent.updateStudent(payload, id);
        this.updatedStudent = JSON.parse(JSON.stringify(data));
        console.log("updatedStudent:", this.updatedStudent);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async deleteStudent(id) {
      try {
        this.loading = true;
        await adminStudent.deleteStudent(id);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async getOneStudent(id) {
      try {
        this.loading = true;
        this.student = await adminStudent.getOneStudent(id);
        console.log("Student from table:", this.student);
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