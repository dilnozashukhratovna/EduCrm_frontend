<template>
  <StudentModal ref="modal_value" />
  <div v-if="store?.students" class="p-[20px] pl-[30px]">
    <div class="mb-[20px] flex justify-between items-center">
      <h1 class="text-[#002842] font-Inter text-[22px] font-[600] uppercase">
        students ({{ store?.count }})
      </h1>
      <button
        @click="openModal"
        class="p-[10px] bg-color1 text-white w-[200px] rounded-full">
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
        <!-- <button @click="openEditModal(item)" class="mr-[10px] ml-[10px]">
          <span class="flex justify-center items-center gap-2 z-50">
            <svg-icon
              type="mdi"
              :path="mdiSquareEditOutline"
              class="hover:text-color1-600 z-50 text-[#fcba03]"></svg-icon>
          </span>
        </button>
        <button @click="openDelete(item._id)">
          <span class="flex justify-center items-center gap-2 z-50">
            <svg-icon
              type="mdi"
              :path="mdiTrashCanOutline"
              class="hover:text-color1-600 z-50 text-[crimson]"></svg-icon>
          </span>
        </button> -->
      </template>
    </app-table>
    <div>
      <v-pagination
        v-model="params.page"
        :pages="params.last_page"
        :range-size="1"
        active-color="#DCEDFF"
        @update:modelValue="store.getStudents(params)" />
    </div>
  </div>
  <div v-else class="mt-[250px] text-center text-color1 text-[30px]">
    Loading...
  </div>
  <!-- <loader v-if="store.loading"></loader> -->
</template>

<script setup>
import { useStudentStore } from "../../stores/admin/student";
import VActions from "../../components/form/VActions.vue";
import { ref, onMounted } from "vue";
import AppTable from "../../components/ui/app-table.vue";
import StudentModal from "./Modals/studentModal.vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import Loader from "@/components/loader/Loader.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPencil, mdiTrashCanOutline, mdiSquareEditOutline } from "@mdi/js";

const store = useStudentStore();
const studentModal = ref();
const params = {
  page: 1,
  limit: 10,
  last_page: null,
};

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

// const openModal = () => {
//   studentModal.value.openModal();
// };

// const openEditModal = (item) => {
//   studentModal.value.openModal(item);
// };

// const openDelete = (id) => {
//   console.log(id);
//   studentModal.value.openDeleteModal(id);
// };

onMounted(() => {
  store.getStudents(params);
});
</script>

<style lang="scss" scoped>

</style>
