import { defineStore } from "pinia";
import { directorStaffs } from "../../api/director/directorStaffs";
export const useStaffStore = defineStore("staff", {
  state: () => ({
    staffs: null,
    count: null,
    loading: false,
    error: null,
    newStaff: null,
    updatedStaff: null,
    staff: null,
  }),
  getters: {},
  actions: {
    async getStaffs(params) {
      try {
        this.loading = true;
        const res = await directorStaffs.getStaffs(params);
        this.staffs = res.staffs;
        console.log("Staffs", this.staffs);
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
    async createStaff(payload) {
      try {
        const data = await directorStaffs.createStaff(payload);
        this.newStaff = JSON.parse(JSON.stringify(data));
        console.log("NewStaff:", this.newStaff);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      }
    },
    // async updateStaff(payload, id) {
    //   try {
    //     this.loading = true;
    //     const data = await adminStaff.updateStaff(payload, id);
    //     this.updatedStaff = JSON.parse(JSON.stringify(data));
    //     console.log("updatedStaff:", this.updatedStaff);
    //   } catch (error) {
    //     this.error = error?.response?.data?.message
    //       ? error?.response?.data?.message
    //       : error.message;
    //     console.log(error);
    //   } finally {
    //     this.loading = false;
    //   }
    // },

    // async deleteStaff(id) {
    //   try {
    //     this.loading = true;
    //     await adminStaff.deleteStaff(id);
    //   } catch (error) {
    //     this.error = error?.response?.data?.message
    //       ? error?.response?.data?.message
    //       : error.message;
    //     console.log(error);
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    // async getOneStaff(id) {
    //   try {
    //     this.loading = true;
    //     this.staff = await adminStaff.getOneStaff(id);
    //     console.log("Staff from table:", this.staff);
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
