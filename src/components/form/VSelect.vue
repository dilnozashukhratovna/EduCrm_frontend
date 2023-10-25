<template>
  <div class="mb-2 block">
    <label
      :for="name"
      class="text-[18px] text-color1 font-medium mb-5 select-none"
      >{{ label }}</label
    >
    <br />
    <vee-field
      as="select"
      :name="name"
      id="select"
      class="w-full border outline-none rounded-lg px-3 py-2 text-[18px] placeholder:text-color1/50 focus:border-color1 mb-[10px]">
      <option disabled value="">Please select one</option>
      <option
        class="custom-select-option text-paragraph-default"
        v-for="(option, index) in options"
        :key="`${index}${option}`"
        :value="JSON.stringify(option)">
        {{ option.name ? option.name : option }}
      </option>
    </vee-field>
    <br />
    <ErrorMessage
      class="text-[16px] text-error_color select-none mb-[30px]"
      :name="name" />
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String },
  name: { type: String },
  isDisabled: { type: Boolean },
  options: { type: Array },
});
</script>

<style lang="scss" scoped></style>
