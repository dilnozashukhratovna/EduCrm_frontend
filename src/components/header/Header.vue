<template>
  <div
    class="w-full h-[70px] bg-color1 flex justify-between items-center px-10 border-2 border-white">
    <div class="flex items-center">
      <div class="button">
        <button
          v-if="isOpen === false"
          class="p-[15px] bg-inherit border-none mr-[30px] lg:hidden"
          @click="isOpen = true">
          <svg-icon
            type="mdi"
            :path="mdiChevronRight"
            class="text-white text-center"></svg-icon>
        </button>
        <button
          v-else
          class="p-[15px] bg-inherit border-none mr-[30px] lg:hidden"
          @click="isOpen = false">
          <svg-icon
            type="mdi"
            :path="mdiChevronLeft"
            class="text-white text-center"></svg-icon>
        </button>
      </div>
      <VSearch></VSearch>
    </div>
    <div class="flex justify-center items-center gap-[10px]">
      <span
        class="w-[40px] h-[40px] flex justify-center items-center bg-white rounded-full mr-[5px]">
        <svg-icon
          type="mdi"
          :path="mdiAccountOutline"
          class="text-[#002842]"></svg-icon>
      </span>
      <span class="text-white text-[18px] font-thin">Admin</span>
      <svg-icon
        type="mdi"
        :path="mdiChevronDown"
        class="text-white cursor-pointer hover:rotate-180 transition-all duration-300"></svg-icon>
    </div>
  </div>
</template>

<script setup>
import VSearch from "@/components/form/VSearch.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiAccountOutline,
  mdiChevronDown,
  mdiChevronRight,
  mdiChevronLeft,
} from "@mdi/js";
import { ref } from "vue";
import { UseSidebar } from "../../hooks/UseSidebar";
const { isOpen } = UseSidebar();

const open = ref(false);
const rotate = (e) => {
  open.value = !open.value;
  if (open.value) {
    console.log((e.target.style.rotate = "180deg"));
  } else {
    console.log((e.target.style.rotate = "0deg"));
  }
};
</script>

<style lang="scss" scoped></style>
