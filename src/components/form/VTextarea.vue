<template>
  <div class="w-full flex flex-col">
    <label
      :for="name"
      class="text-[18px] text-color1 font-medium mb-1 select-none"
      >{{ label }}</label
    >
    <vee-field
      as="textarea"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      class="border outline-none rounded-lg px-3 py-2 text-[18px] placeholder:text-color1/50 focus:border-color1 mb-[10px] h-[110px] resize-none rounded-md" />
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
});
</script>

<style lang="scss" scoped></style>
