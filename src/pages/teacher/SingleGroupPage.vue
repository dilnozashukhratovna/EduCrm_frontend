<template>
  <div>
    <h1>Single Group</h1>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useTeacherSingleGroupStore } from "../../stores/teacher/single_group";
import { useRoute } from "vue-router";
const route = useRoute();
const store = useTeacherSingleGroupStore();
const groupId = route.params.id;

onMounted(() => {
  store.getTeacherSingleGroup(groupId);
});
</script>

<style lang="scss" scoped></style>
