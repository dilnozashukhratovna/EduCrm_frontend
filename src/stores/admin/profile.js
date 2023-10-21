import { defineStore } from "pinia";
import { userProfile } from "../../api/admin/userProfile";
export const useUserProfileStore = defineStore("user_profile", {
  state: () => ({
    user: null,
    count: null,
    loading: false,
    error: null,
  }),
  getters: {},
  actions: {
    async getUser(id) {
      try {
        this.loading = true;
        this.user = await userProfile.getUser(id);
        console.log("User", this.user);
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
