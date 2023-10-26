<template>
  <div class="w-full flex justify-between">
    <div></div>
    <!-- <div v-if="params.last_page != 1"> -->
    <v-pagination
      v-model="params.page"
      :pages="params.last_page"
      :range-size="1"
      active-color="#DCEDFF"
      @update:modelValue="changeParams" />
    <!-- <div v-else></div> -->
    <!-- </div> -->
    <!-- <el-pagination
      v-model:current-page="params.page"
      v-model:page-size="params.last_page"
      :page-sizes="[5, 10]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="params.last_page"
      @size-change="changeParams"
      @current-change="changeParams" /> -->
  </div>
</template>

<script setup>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

const props = defineProps({
  params: {
    type: Object,
  },
  changeParams: {
    type: Function,
  },
});
console.log(props.params.last_page);
</script>

<style lang="scss" scoped></style>
