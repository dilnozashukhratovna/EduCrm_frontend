import { defineStore } from "pinia";
import { directorRoles } from "../../api/director/directorRoles";
export const useRoleStore = defineStore("role", {
  state: () => ({
    roles: null,
    count: null,
    loading: false,
    error: null,
    newRole: null,
    updatedRole: null,
    role: null,
  }),
  getters: {},
  actions: {
    async getRoles() {
      try {
        this.loading = true;
        const res = await directorRoles.getRoles();
        this.roles = res.roles;
        console.log("Roles", this.roles);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async createRole(payload) {
      try {
        this.loading = true;
        const data = await directorRoles.createRole(payload);
        this.newRole = JSON.parse(JSON.stringify(data));
        console.log("NewRole:", this.newRole);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async updateRole(payload, id) {
      try {
        this.loading = true;
        const data = await directorRoles.updateRole(payload, id);
        this.updatedRole = JSON.parse(JSON.stringify(data));
        console.log("updatedRole:", this.updatedRole);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async deleteRole(id) {
      try {
        this.loading = true;
        await directorRoles.deleteRole(id);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    // async getOneRole(id) {
    //   try {
    //     this.loading = true;
    //     this.role = await adminRole.getOneRole(id);
    //     console.log("Role from table:", this.role);
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
