<template>
  <RoomModal ref="modal_value" />
  <div v-if="store?.rooms" class="p-[20px] pl-[30px]">
    <div class="mb-[20px] flex justify-between items-center">
      <h1 class="text-[#002842] font-Inter text-[22px] font-[600] uppercase">
        rooms ({{ store?.count }})
      </h1>
      <button
        @click="openModal"
        class="p-[10px] bg-color1 text-white w-[200px] rounded-full">
        create room
      </button>
    </div>
    <!-- ===================== TABLE ============== -->
    <app-table :headers="headers" :body="store?.rooms">
      <!-- ===================== CHECKBOX CONFIGURATION ============== -->
      <template #body_checkbox>
        <span class="w-full flex justify-center items-center"
          ><input type="checkbox" class="w-[18px] h-[18px]"
        /></span>
      </template>
      <!-- ===================== ID ====================== -->
      <template #body_id="{ item }">
        <span>{{ item._id }}</span>
      </template>
      <!-- =====================BUTTONS CONFIGURATION ============== -->
      <template #body_action="{ item }">
        <VActions :item="item" :modal_value="modal_value"></VActions>
      </template>
    </app-table>
    <app-pagination :params="params" :change-params="getRooms"></app-pagination>
  </div>
  <!-- <div v-else class="mt-[250px] text-center text-color1 text-[30px]">
    Loading...
  </div> -->
  <table-loader v-if="store.loading"></table-loader>
</template>

<script setup>
import { useRoomStore } from "../../stores/admin/room";
import VActions from "../../components/form/VActions.vue";
import { ref, onMounted } from "vue";
import AppTable from "../../components/ui/app-table.vue";
import RoomModal from "./Modals/roomModal.vue";
import appPagination from "../../components/ui/app-pagination.vue";
import Loader from "@/components/loader/Loader.vue";
import TableLoader from "../../components/loader/TableLoader.vue";

const store = useRoomStore();
const params = {
  page: 1,
  limit: 10,
  last_page: null,
};

const modal_value = ref("");
const headers = ref([
  { title: "checkbox", value: "checkbox" },
  { title: "ID", value: "_id" },
  { title: "ROOM NAME", value: "name" },
  { title: "ROOM SIZE", value: "size" },
  { title: "ACTION", value: "action" },
]);

const openModal = () => {
  modal_value.value.openModal();
};

const getRooms = () => {
  store.getRooms(params);
};

onMounted(() => {
  store.getRooms(params);
});
</script>

<style lang="scss" scoped></style>
