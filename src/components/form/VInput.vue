<template>
  <div class="w-full flex flex-col">
    <label
      :for="name"
      class="text-[18px] text-global1 font-medium mb-1 select-none"
      >{{ label }}</label
    >
    <vee-field
      v-if="mask"
      :id="name"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      v-mask="mask"
      masked="true"
      :disabled="disabled"
      class="border outline-none rounded-lg px-3 py-2 text-[18px] placeholder:text-global1/50 focus:border-global1 mb-[10px] disabled:text-gray-400 disabled:cursor-not-allowed" />
    <vee-field
      v-else
      :id="name"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      class="border outline-none rounded-lg px-3 py-2 text-[18px] placeholder:text-global1/50 focus:border-global1 mb-[10px] disabled:text-gray-400 disabled:cursor-not-allowed" />
    <ErrorMessage
      :name="name"
      class="text-[16px] text-error_color select-none mb-[20px]" />
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String },
  name: { type: String },
  type: { type: String, default: "text" },
  placeholder: { type: String },
  mask: { type: String },
  disabled: { type: Boolean, default: false },
});
</script>

<style lang="scss" scoped></style>
