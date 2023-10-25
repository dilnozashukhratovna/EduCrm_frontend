<template>
  <div
    class="w-full h-[76px] bg-color1 flex justify-between items-center px-10 lg:border-l">
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
        <!-- <svg-icon
          type="mdi"
          :path="mdiAccountOutline"
          class="text-[#002842]"></svg-icon> -->
        <img
          :src="image"
          alt=""
          v-if="store?.profile?.image"
          class="w-[40px] h-[40px] rounded-full" />
        <img
          src="../../assets/images/avatar.jpeg"
          alt=""
          v-else
          class="w-[40px] h-[40px] rounded-full" />
      </span>
      <span class="text-white text-[18px] font-thin" v-if="store?.profile">{{
        full_name
      }}</span>
      <span class="text-white text-[18px] font-thin" v-else>{{ name }}</span>
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
  mdiMenu,
} from "@mdi/js";
import { computed, onMounted, ref } from "vue";
import { UseSidebar } from "../../hooks/UseSidebar";
import { useAuthStore } from "../../stores/auth";
const { isOpen } = UseSidebar();
const store = useAuthStore();
const role = localStorage.getItem("role");
const name = computed(() => {
  if (role == "admin") return "Admin";
  else if (role == "director") return "Director";
  else if (role == "teacher") return "Teacher";
});
// const full_name = computed(() => {
//   if (store?.profile?.first_name) return "Admin";
//   else if (role == "director") return "Director";
//   else if (role == "teacher") return "Teacher";
// });

const image = ref("");
const full_name = ref("");
const updateData = () => {
  image.value = store?.profile?.image;
  full_name.value = `${store?.profile?.first_name} ${store?.profile?.last_name}`;
};

console.log("Full name:", full_name);

const open = ref(false);
const rotate = (e) => {
  open.value = !open.value;
  if (open.value) {
    console.log((e.target.style.rotate = "180deg"));
  } else {
    console.log((e.target.style.rotate = "0deg"));
  }
};

onMounted(async () => {
  await store.getProfile();
  updateData();
});
</script>

<style lang="scss" scoped></style>
