<template>
  <GroupModal ref="modal_value" />
  <div v-if="store?.groups" class="p-[20px] pl-[30px]">
    <div class="mb-[20px] flex justify-between items-center">
      <h1 class="text-[#002842] font-Inter text-[22px] font-[600] uppercase">
        <!-- group ({{ store?.groups?.length }}) -->
        groups
      </h1>
      <!-- <button
        @click="openModal"
        class="p-[10px] bg-color1 text-white w-[200px] rounded-full">
        create group
      </button> -->
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
      <!-- ===================== DAYS ====================== -->
      <template #body_days="{ item }">
        <div v-if="item?.days" class="flex gap-2">
          <span>Mon/Wed/Fri</span>
        </div>
        <div v-else class="flex gap-2">
          <span>Tue/Thu/Sat</span>
        </div>
      </template>
      <!-- =====================BUTTONS CONFIGURATION ============== -->
      <template #body_action="{ item }">
        <VActions :item="item" :modal_value="modal_value"></VActions>
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
      <!-- ===================== STUDENTS COUNT ====================== -->
      <template #body_student_count="{ item }">
        <!-- <span>{{ item }}</span> -->
        <span v-if="item.student_count > 0">{{ item.student_count }}</span>
        <span v-else>No students yet</span>
      </template>
    </app-table>
  </div>
  <!-- <div v-else class="mt-[250px] text-center text-color1 text-[30px]">
    Loading...
  </div> -->
  <table-loader v-if="store.loading"></table-loader>
</template>

<script setup>
import { onMounted, ref } from "vue";
import appTable from "../../components/ui/app-table.vue";
import VActions from "../../components/form/VActions.vue";
// import GroupModal from "./Modals/groupModal.vue";
import { useTeacherGroupStore } from "../../stores/teacher/group";
import { useAuthStore } from "../../stores/auth";
import { FormatDate } from "../../hooks/FormatDate";
import { FormatTime } from "../../hooks/FormatTime";
import TableLoader from "../../components/loader/TableLoader.vue";
const store = useTeacherGroupStore();
const auth_store = useAuthStore();
const modal_value = ref("");

const headers = ref([
  { title: "checkbox", value: "checkbox" },
  { title: "GROUP NAME", value: "name" },
  { title: "STUDENTS", value: "student_count" },
  { title: "START TIME", value: "start_time" },
  { title: "END TIME", value: "end_time" },
  { title: "DAYS", value: "days" },
  { title: "START DATE", value: "start_date" },
  { title: "END DATE", value: "start_date" },
  { title: "ACTION", value: "action" },
]);

// const formatData = (data) => {
//   return moment(data).format("YYYY-MM-DD");
// };

// const formatTime = (time) => {
//   let hour = `${parseInt(time / 60)}`.padStart(2, 0);
//   let minute = `${time % 60}`.padStart(2, 0);
//   let result = `${hour}:${minute}`;
//   return result;
// };

const openModal = () => {
  modal_value.value.openModal();
};

onMounted(async () => {
  await auth_store.getProfile();
  store.getTeacherGroups(auth_store?.profile?._id);
});
</script>

<style lang="scss" scoped></style>
