<template>
  <table-loader v-if="store?.loading"></table-loader>
  <div v-else>
    <div v-if="store?.groups" class="p-[20px] pl-[30px]">
      <div class="mb-[20px] flex justify-between items-center">
        <h1 class="text-[#002842] font-Inter text-[22px] font-[600] uppercase">
          teacher groups ({{ store?.groups?.length }})
          <!-- teacher groups -->
        </h1>
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
          <span v-if="item.student_count > 0">{{ item.student_count }}</span>
          <span v-else>No students yet</span>
        </template>
        <!-- ===================== NAME LINK ====================== -->
        <template #body_name="{ item }">
          <router-link
            :to="`/teacher_single_group/${item._id}`"
            class="hover:text-[crimson]"
            >{{ item.name }}</router-link
          >
        </template>
      </app-table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import appTable from "../../components/ui/app-table.vue";
import VActions from "../../components/form/VActions.vue";
import { useTeacherGroupStore } from "../../stores/teacher/group";
import { useAuthStore } from "../../stores/auth";
import { FormatDate, FormatTime } from "../../hooks/FormatDate";
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

onMounted(async () => {
  await auth_store.getProfile();
  store.getTeacherGroups(auth_store?.profile?._id);
});
</script>

<style lang="scss" scoped></style>
