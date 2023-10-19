<template>
  <div class="flex justify-center items-center flex-col font-[500]">
    <h1 class="text-[20px] text-color1">
      Are you sure you want to delete this {{ name }}?
    </h1>
    <div class="mt-[30px]">
      <button
        class="p-[10px] w-[130px] bg-color1 hover:bg-[#073452] text-white rounded-full"
        @click="$emit('update:modelValue', false)">
        CANCEL
      </button>
      <button
        class="p-[10px] w-[130px] bg-[crimson] hover:bg-[#ab0518] text-white ml-[30px] rounded-full"
        @click="deleteFunction">
        DELETE
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  deleteFunction: {
    type: Function,
  },
  modelValue: {
    type: Boolean,
  },
  name: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
