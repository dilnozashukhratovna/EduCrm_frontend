import { defineStore } from "pinia";
import { adminRoom } from "../../api/admin/adminRoom";
export const useRoomStore = defineStore("room", {
  state: () => ({
    rooms: null,
    count: null,
    loading: false,
    error: null,
    newRoom: null,
    updatedRoom: null,
    room: null,
  }),
  getters: {},
  actions: {
    async getRooms(params) {
      try {
        this.loading = true;
        const res = await adminRoom.getRooms(params);
        this.rooms = res.rooms;
        console.log("Rooms", this.rooms);
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
    async createRoom(payload) {
      try {
        this.loading = true;
        const data = await adminRoom.createRoom(payload);
        this.newRoom = JSON.parse(JSON.stringify(data));
        console.log("NewRoom:", this.newRoom);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async updateRoom(payload, id) {
      try {
        this.loading = true;
        const data = await adminRoom.updateRoom(payload, id);
        this.updatedRoom = JSON.parse(JSON.stringify(data));
        console.log("updatedRoom:", this.updatedRoom);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async deleteRoom(id) {
      try {
        this.loading = true;
        await adminRoom.deleteRoom(id);
      } catch (error) {
        this.error = error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async getOneRoom(id) {
      try {
        this.loading = true;
        this.room = await adminRoom.getOneRoom(id);
        console.log("Room from table:", this.room);
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
