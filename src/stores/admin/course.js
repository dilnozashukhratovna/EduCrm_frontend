import { defineStore } from "pinia";
import { adminCourse } from "../../api/admin/adminCourse";
import Notification from "../../plugins/Notification";
export const useCourseStore = defineStore("course", {
  state: () => ({
    courses: null,
    count: null,
    loading: false,
    error: null,
    newCourse: null,
    updatedCourse: null,
    course: null,
  }),
  getters: {},
  actions: {
    async getCourses(params) {
      try {
        this.loading = true;
        const res = await adminCourse.getCourses(params);
        this.courses = res.courses;
        console.log("Courses", this.courses);
        this.count = res.count;
        params.last_page = Math.ceil(this.count / params?.limit);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async createCourse(payload) {
      try {
        const data = await adminCourse.createCourse(payload);
        this.newCourse = JSON.parse(JSON.stringify(data));
        console.log("NewCourse:", this.newCourse);
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
    async updateCourse(payload, id) {
      try {
        const data = await adminCourse.updateCourse(payload, id);
        this.updatedCourse = JSON.parse(JSON.stringify(data));
        console.log("updatedCourse:", this.updatedCourse);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      }
    },

    async deleteCourse(id) {
      try {
        await adminCourse.deleteCourse(id);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      }
    },
    async getOneCourse(id) {
      try {
        this.course = await adminCourse.getOneCourse(id);
        console.log("Course from table:", this.course);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      }
    },
  },
});
