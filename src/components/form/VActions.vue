<template>
  <!-- <div class="w-full flex items-center justify-center"> -->
  <div class="w-full flex">
    <svg-icon
      type="mdi"
      :path="mdiSquareEditOutline"
      @click="openEditModal"
      class="z-50 text-[#fcba03] cursor-pointer w-[30px] h-[30px]"></svg-icon>
    <svg-icon
      type="mdi"
      :path="mdiTrashCanOutline"
      @click="openDeleteModal"
      class="z-50 text-[crimson] cursor-pointer w-[30px] h-[30px]"></svg-icon>
    <svg-icon
      v-if="path"
      type="mdi"
      :path="mdiEye"
      @click="openSingleUser"
      class="z-50 text-[grey] cursor-pointer w-[30px] h-[30px]"></svg-icon>
  </div>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiTrashCanOutline, mdiSquareEditOutline, mdiEye } from "@mdi/js";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  item: {
    type: Object,
  },
  modal_value: {
    type: String,
  },
  path: {
    type: String,
  },
});

const openEditModal = () => {
  props.modal_value.openModal(props.item);
};

const openDeleteModal = () => {
  props.modal_value.openDeleteModal(props.item._id);
};

const openSingleUser = () => {
  router.push(`${props.path}/${props.item._id}`);
};
</script>

<style lang="scss" scoped></style>
