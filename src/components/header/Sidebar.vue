<template>
  <div class="flex bg-color1">
    <div
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
      class="bg-color1 w-[223px] mt-[70px] fixed inset-y-0 left-0 z-20 overflow-y-auto transition duration-300 transform lg:translate-x-0 lg:static lg:inset-0">
      <router-link
        v-for="(item, index) in AdminMenu"
        :key="index"
        class="w-full flex justify-start gap-5 items-center font-normal text-white text-[20px] pl-[30px] pr-[70px] py-[15px] select-none"
        active-class="active-link"
        :to="item.path"
        ><Icon type="mdi" :path="item.icon" class="text-[20px]"></Icon>
        {{ item.label }}</router-link
      >
    </div>
  </div>
</template>

<script setup>
import Icon from "@jamescoyle/vue-icon";
import { UseSidebar } from "../../hooks/UseSidebar";
import { AdminMenu } from "../menu/AdminMenu";
const { isOpen } = UseSidebar();
</script>

<style lang="scss" scoped>
.active-link {
  background-color: #f5fccd;
  color: #12486b;
}
</style>
