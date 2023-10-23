<template>
  <div class="flex bg-white">
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="fixed inset-0 z-10 transition-opacity opacity-50 lg:hidden bg-[#00111380]"
      @click="isOpen = false"></div>
    <div
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
      class="w-[223px] bg-color1 pt-[70px] inset-y-0 fixed left-0 z-10 overflow-y-auto duration-300 lg:translate-x-0 lg:static">
      <span v-for="(item, index) in menu" :key="index">
        <router-link
          class="flex justify-start gap-4 items-center font-normal text-white text-[20px] pl-[30px] py-[15px] select-none transition-all duration-200"
          active-class="active-link"
          :class="{
            'active-link': $route.meta.child === `${item.keys}`,
            'border-t': index === 0,
          }"
          :to="item.path"
          ><Icon type="mdi" :path="item.icon" class="text-[20px]"></Icon>
          {{ item.label }}</router-link
        >
      </span>
    </div>
  </div>
</template>

<script setup>
import Icon from "@jamescoyle/vue-icon";
import { computed, ref } from "vue";
import { UseSidebar } from "../../hooks/UseSidebar";
import { AdminMenu } from "../menu/AdminMenu";
import { DirectorMenu } from "../menu/DirectorMenu";
const { isOpen } = UseSidebar();
const role = localStorage.getItem("role");
const menu = computed(() => {
  if (role == "admin") return AdminMenu;
  else if (role == "director") return DirectorMenu;
});
</script>

<style lang="scss" scoped>
.active-link {
  background-color: #f5fccd;
  color: #12486b;
}
</style>
