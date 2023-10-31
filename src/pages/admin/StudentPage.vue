<template>
  <table-loader v-if="store.loading"></table-loader>
  <div v-else>
    <StudentModal ref="modal_value" />
    <div v-if="store?.students" class="p-[20px] pl-[30px]">
      <div class="mb-[20px] flex justify-between items-center">
        <h1 class="text-[#002842] font-Inter text-[22px] font-[600] uppercase">
          students ({{ store?.count }})
        </h1>
        <button
          @click="openModal"
          class="p-[10px] bg-global1 text-white w-[200px] rounded-full hover:bg-[#5388a8]">
          create student
        </button>
      </div>
      <!-- ===================== TABLE ============== -->
      <app-table :headers="headers" :body="store?.students">
        <!-- ===================== CHECKBOX CONFIGURATION ============== -->
        <template #body_checkbox>
          <span class="w-full flex justify-center items-center"
            ><input type="checkbox" class="w-[18px] h-[18px]"
          /></span>
        </template>
        <!-- ===================== IMAGE ============== -->
        <template #body_image="{ item }">
          <span class="w-full flex items-center">
            <img
              v-if="item?.image == null"
              src="../../assets/images/avatar.jpeg"
              alt=""
              class="w-[50px] h-[50px] rounded-full" />
            <img
              v-else
              :src="item?.image"
              alt=""
              class="w-[50px] h-[50px] rounded-full" />
          </span>
        </template>
        <!-- ===================== ID ====================== -->
        <template #body_id="{ item }">
          <span>{{ item._id }}</span>
        </template>
        <!-- =====================/FULL NAME ================ -->
        <template #body_full_name="{ item }">
          {{ `${item.first_name} ${item.last_name}` }}
        </template>
        <!-- =====================BUTTONS CONFIGURATION ============== -->
        <template #body_action="{ item }">
          <VActions :item="item" :modal_value="modal_value"></VActions>
        </template>
      </app-table>
      <app-pagination
        :params="params"
        :change-params="getStudents"></app-pagination>
    </div>
  </div>
</template>

<script setup>
import { useStudentStore } from "../../stores/admin/student";
import VActions from "../../components/form/VActions.vue";
import { ref, onMounted } from "vue";
import AppTable from "../../components/ui/app-table.vue";
import StudentModal from "./Modals/studentModal.vue";
import TableLoader from "../../components/loader/TableLoader.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import appPagination from "../../components/ui/app-pagination.vue";
import { mdiPencil, mdiTrashCanOutline, mdiSquareEditOutline } from "@mdi/js";

const store = useStudentStore();
const params = ref({
  page: 1,
  limit: 9,
  last_page: null,
});

const modal_value = ref("");
const headers = ref([
  { title: "checkbox", value: "checkbox" },
  { title: "IMAGE", value: "image" },
  { title: "ID", value: "_id" },
  { title: "FULL NAME", value: "full_name" },
  { title: "PHONE NUMBER", value: "phone" },
  { title: "COURSES", value: "courses" },
  { title: "GROUPS", value: "groups" },
  { title: "STATUS", value: "status" },
  { title: "ACTION", value: "action" },
]);

const openModal = () => {
  modal_value.value.openModal();
};

const getStudents = () => {
  store.getStudents(params.value);
};

onMounted(() => {
  store.getStudents(params.value);
});
</script>

<style lang="scss" scoped></style>
