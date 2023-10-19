<template>
  <GroupModal ref="modal_value" />
  <div v-if="store?.groups" class="p-[20px] pl-[30px]">
    <div class="mb-[20px] flex justify-between items-center">
      <h1 class="text-[#002842] font-Inter text-[22px] font-[600] uppercase">
        groups ({{ store?.count }})
      </h1>
      <button
        @click="openModal"
        class="p-[10px] bg-color1 text-white w-[200px] rounded-full">
        create group
      </button>
    </div>
    <!-- ===================== TABLE ============== -->
    <app-table :headers="headers" :body="store?.groups">
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
      <!-- ===================== ROOM ID ====================== -->
      <template #body_room_id="{ item }">
        <span v-if="item?.room_id === null">Not choosen</span>
        <span v-else>{{ item?.room_id?.name }}</span>
      </template>
      <!-- ===================== COURSE ID ====================== -->
      <template #body_course_id="{ item }">
        <span v-if="item?.course_id === null">Not choosen</span>
        <span v-else>{{ item?.course_id?.name }}</span>
      </template>
      <!-- ===================== DAYS ====================== -->
      <template #body_days="{ item }">
        <div v-if="item?.days" class="flex gap-2">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>
        <div v-else class="flex gap-2">
          <span>Tue</span>
          <span>Thu</span>
          <span>Sat</span>
        </div>
      </template>
      <!-- ===================== START DATE ====================== -->
      <template #body_start_date="{ item }">
        <span>{{ formatData(item?.start_date) }}</span>
      </template>
      <!-- ===================== END DATE ====================== -->
      <template #body_end_date="{ item }">
        <span>{{ formatData(item?.end_date) }}</span>
      </template>
      <!-- ===================== START TIME ====================== -->
      <template #body_start_time="{ item }">
        <span>{{ formatTime(item?.start_time) }}</span>
      </template>
      <!-- ===================== END TIME ====================== -->
      <template #body_end_time="{ item }">
        <span>{{ formatTime(item?.end_time) }}</span>
      </template>
      <!-- =====================BUTTONS CONFIGURATION ============== -->
      <template #body_action="{ item }">
        <VActions :item="item" :modal_value="modal_value"></VActions>
      </template>
    </app-table>
    <div>
      <v-pagination
        v-model="params.page"
        :pages="params.last_page"
        :range-size="1"
        active-color="#DCEDFF"
        @update:modelValue="store.getGroups(params)" />
    </div>
  </div>
  <div v-else class="mt-[250px] text-center text-color1 text-[30px]">
    Loading...
  </div>
  <!-- <loader v-if="store.loading"></loader> -->
</template>

<script setup>
import { useGroupStore } from "../../stores/admin/group";
import { useCourseStore } from "../../stores/admin/course";
import VActions from "../../components/form/VActions.vue";
import { ref, onMounted } from "vue";
import AppTable from "../../components/ui/app-table.vue";
import GroupModal from "./Modals/groupModal.vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import Loader from "@/components/loader/Loader.vue";
import moment from "moment";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPencil, mdiTrashCanOutline, mdiSquareEditOutline } from "@mdi/js";

const store = useGroupStore();
const store2 = useCourseStore();
const groupModal = ref();
const params = {
  page: 1,
  limit: 10,
  last_page: null,
};

const modal_value = ref("");
const headers = ref([
  { title: "checkbox", value: "checkbox" },
  // { title: "ID", value: "_id" },
  { title: "GROUP NAME", value: "name" },
  { title: "START DATE", value: "start_date" },
  { title: "END DATE", value: "end_date" },
  { title: "DAYS", value: "days" },
  { title: "START TIME", value: "start_time" },
  { title: "END TIME", value: "end_time" },
  { title: "ROOM NAME", value: "room_id" },
  { title: "STATUS", value: "status" },
  { title: "COURSE NAME", value: "course_id" },
  { title: "ACTION", value: "action" },
]);

const formatData = (data) => {
  return moment(data).format("YYYY-MM-DD");
};
const formatTime = (time) => {
  let hour = `${parseInt(time / 60)}`.padStart(2, 0);
  let minute = `${time % 60}`.padStart(2, 0);
  let result = `${hour}:${minute}`;
  return result;
};
const openModal = () => {
  modal_value.value.openModal();
};

onMounted(() => {
  store.getGroups(params);
  store2.getCourses(params);
});
</script>

<style lang="scss" scoped>
h1 {
  align-items: spa;
}
</style>
