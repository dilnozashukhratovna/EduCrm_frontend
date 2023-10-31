import { defineStore } from "pinia";
import { adminStudent } from "../../api/admin/adminStudent";
import Notification from "../../plugins/Notification";
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
        const data = await adminStudent.createStudent(payload);
        this.newStudent = JSON.parse(JSON.stringify(data));
        console.log("NewStudent:", this.newStudent);
        Notification("Success", "success");
        location.reload();
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
        Notification("Unproper data submitted", "danger");
      }
    },
    async updateStudent(payload, id) {
      try {
        const data = await adminStudent.updateStudent(payload, id);
        this.updatedStudent = JSON.parse(JSON.stringify(data));
        console.log("updatedStudent:", this.updatedStudent);
        location.reload();
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      }
    },

    async deleteStudent(id) {
      try {
        await adminStudent.deleteStudent(id);
        Notification("Success", "success");
        location.reload();
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
        Notification("Error occured", "danger");
      }
    },
    async getOneStudent(id) {
      try {
        this.student = await adminStudent.getOneStudent(id);
        console.log("Student from table:", this.student);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      }
    },
  },
});
