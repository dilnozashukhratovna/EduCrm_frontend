<template>
  <RoleModal ref="modal_value" />
  <div v-if="store?.roles" class="p-[20px] pl-[30px]">
    <div class="mb-[20px] flex justify-between items-center">
      <h1 class="text-[#002842] font-Inter text-[22px] font-[600] uppercase">
        role ({{ store?.roles?.length }})
        <!-- role -->
      </h1>
      <!-- <button
        @click="openModal"
        class="p-[10px] bg-color1 text-white w-[200px] rounded-full">
        create role
      </button> -->
    </div>
    <!-- ===================== TABLE ============== -->
    <app-table :headers="headers" :body="store?.roles">
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
      <!-- ===================== DESC ====================== -->
      <template #body_description="{ item }">
        <span v-if="item.description == '' || item.description == null">
          No desc
        </span>
        <span v-else>{{ item.description }}</span>
      </template>
      <!-- =====================BUTTONS CONFIGURATION ============== -->
      <!-- <template #body_action="{ item }">
        <VActions :item="item" :modal_value="modal_value"></VActions>
      </template> -->
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
import { useRoleStore } from "../../stores/director/roles";
import VActions from "../../components/form/VActions.vue";
import RoleModal from "./Modals/roleModal.vue";
import TableLoader from "../../components/loader/TableLoader.vue";
import moment from "moment";
const store = useRoleStore();
const modal_value = ref("");

const headers = ref([
  { title: "checkbox", value: "checkbox" },
  { title: "ID", value: "_id" },
  { title: "NAME", value: "name" },
  { title: "DESCRIPTION", value: "description" },
  // { title: "Action", value: "action" },
]);

const formatData = (data) => {
  return moment(data).format("YYYY-MM-DD");
};

const openModal = () => {
  modal_value.value.openModal();
};
onMounted(() => {
  store.getRoles();
});
</script>

<style lang="scss" scoped></style>
