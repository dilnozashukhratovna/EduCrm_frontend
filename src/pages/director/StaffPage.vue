<template>
  <StaffModal ref="modal_value" />
  <div v-if="store?.staffs" class="p-[20px] pl-[30px]">
    <div class="mb-[20px] flex justify-between items-center">
      <h1 class="text-[#002842] font-Inter text-[22px] font-[600] uppercase">
        staff ({{ store?.count }})
        <!-- staff -->
      </h1>
      <button
        @click="openModal"
        class="p-[10px] bg-color1 text-white w-[200px] rounded-full">
        create staff
      </button>
    </div>
    <!-- ===================== TABLE ============== -->
    <app-table :headers="headers" :body="store?.staffs">
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
      <!-- =====================BUTTONS CONFIGURATION ============== -->
      <template #body_action="{ item }">
        <VActions :item="item" :modal_value="modal_value"></VActions>
      </template>
      <!-- ===================== START DATE ====================== -->
      <template #body_start_date="{ item }">
        <span>{{ formatData(item?.start_date) }}</span>
      </template>
    </app-table>
    <app-pagination
      :params="params"
      :change-params="getStaffs"></app-pagination>
  </div>
  <!-- <div v-else class="mt-[250px] text-center text-color1 text-[30px]">
    Loading...
  </div> -->
  <table-loader v-if="store.loading"></table-loader>
</template>

<script setup>
import { onMounted, ref } from "vue";
import appTable from "../../components/ui/app-table.vue";
import { useStaffStore } from "../../stores/director/staffs";
import VActions from "../../components/form/VActions.vue";
import StaffModal from "./Modals/staffModal.vue";
import appPagination from "../../components/ui/app-pagination.vue";
import TableLoader from "../../components/loader/TableLoader.vue";
import moment from "moment";
const store = useStaffStore();
const modal_value = ref("");

const headers = ref([
  { title: "checkbox", value: "checkbox" },
  { title: "IMAGE", value: "image" },
  { title: "FIRST NAME", value: "first_name" },
  { title: "LAST NAME", value: "last_name" },
  { title: "PHONE NUMBER", value: "phone" },
  { title: "ROLE", value: "role" },
  { title: "START DATA", value: "start_date" },
  { title: "Action", value: "action" },
]);

const params = {
  page: 1,
  limit: 10,
  last_page: null,
};

const formatData = (data) => {
  return moment(data).format("YYYY-MM-DD");
};

const openModal = () => {
  modal_value.value.openModal();
};

const getStaffs = () => {
  store.getStaffs(params);
};
onMounted(() => {
  store.getStaffs(params);
});
</script>

<style lang="scss" scoped></style>
