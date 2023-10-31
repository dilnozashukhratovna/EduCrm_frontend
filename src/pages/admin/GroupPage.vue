<template>
  <GroupModal ref="modal_value" />
  <div v-if="store?.groups" class="p-[20px] pl-[30px]">
    <div class="mb-[20px] flex justify-between items-center">
      <h1 class="text-[#002842] font-Inter text-[22px] font-[600] uppercase">
        groups ({{ store?.count }})
      </h1>
      <button
        @click="openModal"
        class="p-[10px] bg-global1 text-white w-[200px] rounded-full hover:bg-[#5388a8]">
        create group
      </button>
    </div>
    <table-loader v-if="store.loading"></table-loader>

    <!-- ===================== TABLE ============== -->
    <app-table :headers="headers" :body="store?.groups" v-else>
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
      <!-- ===================== NAME LINK ====================== -->
      <template #body_name="{ item }">
        <router-link
          :to="`/single_group/${item._id}`"
          class="hover:text-[crimson]"
          >{{ item.name }}</router-link
        >
      </template>
      <!-- ===================== ROOM  ====================== -->
      <template #body_room="{ item }">
        <span v-if="item?.room === null">Not choosen</span>
        <span v-else>{{ item?.room?.name }}</span>
      </template>
      <!-- ===================== COURSE ID ====================== -->
      <template #body_course="{ item }">
        <span v-if="item?.course === null">Not choosen</span>
        <span v-else>{{ item?.course?.name }}</span>
      </template>
      <!-- ===================== DAYS ====================== -->
      <template #body_days="{ item }">
        <div v-if="item?.days" class="flex gap-2">
          <span>Mon/Wed/Fri</span>
        </div>
        <div v-else class="flex gap-2">
          <span>Tue/Thu/Sat</span>
        </div>
      </template>
      <!-- ===================== START DATE ====================== -->
      <template #body_start_date="{ item }">
        <span>{{ FormatDate(item?.start_date) }}</span>
      </template>
      <!-- ===================== END DATE ====================== -->
      <template #body_end_date="{ item }">
        <span>{{ FormatDate(item?.end_date) }}</span>
      </template>
      <!-- ===================== START TIME ====================== -->
      <template #body_start_time="{ item }">
        <span>{{ FormatTime(item?.start_time) }}</span>
      </template>
      <!-- ===================== END TIME ====================== -->
      <template #body_end_time="{ item }">
        <span>{{ FormatTime(item?.end_time) }}</span>
      </template>
      <!-- =====================BUTTONS CONFIGURATION ============== -->
      <template #body_action="{ item }">
        <VActions :item="item" :modal_value="modal_value"></VActions>
      </template>
    </app-table>
    <app-pagination
      :params="params"
      :change-params="getGroups"></app-pagination>
  </div>
  <table-loader v-if="store.loading"></table-loader>
</template>

<script setup>
import { useGroupStore } from "../../stores/admin/group";
import { useCourseStore } from "../../stores/admin/course";
import VActions from "../../components/form/VActions.vue";
import { ref, onMounted } from "vue";
import AppTable from "../../components/ui/app-table.vue";
import GroupModal from "./Modals/groupModal.vue";
import appPagination from "../../components/ui/app-pagination.vue";
import { FormatDate, FormatTime } from "../../hooks/FormatDate";
import TableLoader from "../../components/loader/TableLoader.vue";

const store = useGroupStore();
const course_store = useCourseStore();
const params = ref({
  page: 1,
  limit: 10,
  last_page: null,
});

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
  { title: "ROOM NAME", value: "room" },
  { title: "STATUS", value: "status" },
  { title: "COURSE NAME", value: "course" },
  { title: "ACTION", value: "action" },
]);

const openModal = () => {
  modal_value.value.openModal();
};

const getGroups = async () => {
  await store.getGroups(params.value);
};

onMounted(async () => {
  await store.getGroups(params.value);
  await course_store.getCourses(params.value);
});
</script>

<style lang="scss" scoped></style>
