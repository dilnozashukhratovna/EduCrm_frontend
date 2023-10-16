<template>
  <StudentModal ref="studentModal" />
  <div v-if="store.students" class="p-[30px]">
    <div class="mb-[30px] flex items-center">
      <h1 class="text-black font-Inter text-[22px]">
        Students ({{ store.count }})
      </h1>
      <button @click="openModal" class="border-2 p-[10px] ml-[830px]">
        create student
      </button>
    </div>
    <app-table :headers="headers" :body="store?.students">
      <template #body_action="{ item }">
        <button class="border-2 p-[10px]" @click="openEditModal(item)">
          edit
        </button>
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
</template>

<script setup>
import { useAdminStore } from "../../stores/admin";
import { ref, onMounted } from "vue";
import AppTable from "../../components/ui/app-table.vue";
import StudentModal from "./Modals/studentModal.vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
const store = useAdminStore();
const studentModal = ref();
const params = {
  page: 1,
  limit: 10,
  last_page: null,
};
const headers = ref([
  { title: "FIRST NAME", value: "first_name" },
  { title: "LAST NAME", value: "last_name" },
  { title: "PHONE NUMBER", value: "phone" },
  { title: "ACTION", value: "action" },
]);

const openModal = () => {
  studentModal.value.openModal();
};

const openEditModal = (item) => {
  studentModal.value.openModal(item);
};

onMounted(() => {
  store.getStudents(params);
});
</script>

<style lang="scss" scoped></style>
