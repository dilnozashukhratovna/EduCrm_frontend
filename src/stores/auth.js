import { defineStore } from "pinia";
import { authApi } from "../api/auth/authApi";
import router from "@/router/index.js";
import { authProfile } from "../api/auth/authProfile";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    profile: null,
    image: null,
    updatedProfile: null,
  }),
  getters: {},
  actions: {
    async login(payload) {
      try {
        this.loading = true;
        const data = await authApi.login(payload);
        this.user = JSON.parse(JSON.stringify(data));
        console.log("User:", this.user);
        if (data?.tokens?.access_token) {
          localStorage.setItem("token", data.tokens.access_token);
          localStorage.setItem("role", data?.user?.role);
        }
        if (this.user?.user?.role === "admin") {
          router.push({ name: "students" });
        } else if (this.user?.user?.role === "student") {
          router.push({ name: "student" });
        } else if (this.user?.user?.role === "director") {
          router.push({ name: "staffs" });
        } else if (this.user?.user?.role === "teacher") {
          router.push({ name: "teacher" });
        }
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async getProfile() {
      try {
        this.loading = true;
        let res = await authProfile.getProfile();
        this.profile = res;
        console.log("Profile", this.profile);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async updateImage(payload) {
      try {
        this.loading = true;
        let res = await authProfile.updateImage(payload);
        this.image = res.image;
        console.log(this.image);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async updateProfile(payload) {
      try {
        this.loading = true;
        let res = await authProfile.updateProfile(payload);
        this.updateProfile = res;
        console.log("updated profile:", this.updateProfile);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async changePassword(payload) {
      try {
        this.loading = true;
        let res = await authProfile.changePassword(payload);
        // this.updateProfile = res;
        console.log("password:", res);
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
