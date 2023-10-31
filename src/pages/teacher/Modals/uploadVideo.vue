<template>
  <AppModal v-model="dialog">
    <h1>Upload video</h1>
  </AppModal>
</template>

<script setup>
import AppModal from "../../../components/ui/app-modal.vue";
import { computed, ref } from "vue";
const dialog = ref(false);

const openModal = () => {
  dialog.value = true;
};

defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
