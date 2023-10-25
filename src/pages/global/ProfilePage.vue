<template>
  <div class="w-full h-full flex justify-center">
    <!-- <h1>Profile</h1> -->
    <profileModal ref="profile_modal" />
    <div class="mt-[30px]">
      <!-- ===================IMAGE DIV==================== -->
      <div
        class="w-[1000px] h-[480px] p-[20px] flex bg-[white] justify-between shadow-xl">
        <div class="w-[330px] p-[10px]">
          <h1 class="text-color1 mb-[30px] text-[27px] font-[600]">
            Personal Information
          </h1>
          <img
            v-if="image"
            :src="image"
            class="w-[210px] h-[210px] rounded-full ml-[30px]"
            alt="" />
          <img
            v-else
            src="../../assets/images/avatar.jpeg"
            class="w-[210px] h-[210px] rounded-full ml-[30px]"
            alt="" />
          <div class="p-[15px] h-[80px] mt-[30px]">
            <p>Personal ID:</p>
            <h1 class="text-[20px] font-[500]">
              {{ store?.profile?._id }}
            </h1>
          </div>
        </div>
        <!-- ===================INFO DIV==================== -->
        <div
          class="mt-[60px] w-[490px] h-[300px] grid grid-rows-3 grid-flow-col gap-4">
          <div class="p-[15px] h-[80px] flex-col items-center justify-center">
            <p>First name</p>
            <h1 class="text-[20px] font-[600]">
              {{ store?.profile?.first_name }}
            </h1>
          </div>
          <div class="p-[15px] h-[80px] flex-col items-center justify-center">
            <p>Last name</p>
            <h1 class="text-[20px] font-[600]">
              {{ store?.profile?.last_name }}
            </h1>
          </div>
          <div class="p-[15px] h-[80px] flex-col items-center justify-center">
            <p>Phone number</p>
            <h1 class="text-[20px] font-[600]">{{ store?.profile?.phone }}</h1>
          </div>
          <div class="p-[15px] h-[80px] flex-col items-center justify-center">
            <p>Role</p>
            <h1 class="text-[20px] font-[600]">{{ store?.profile?.role }}</h1>
          </div>
          <div class="p-[15px] h-[80px] flex-col items-center justify-center">
            <p>Start date</p>
            <h1 class="text-[20px] font-[600]">
              {{ FormatDate(store?.profile?.start_date) }}
            </h1>
          </div>
          <div class="p-[15px] h-[80px] flex-col items-center justify-center">
            <p>Status</p>
            <h1 class="text-[20px] font-[600]">
              {{ store?.profile?.status }}
            </h1>
          </div>
        </div>
        <!-- ===================BUTTON DIV==================== -->
        <div>
          <button @click="updateProfile">
            <svg-icon
              type="mdi"
              :path="mdiPencil"
              class="z-50 text-color1 cursor-pointer w-[30px] h-[30px]"></svg-icon>
          </button>
        </div>
      </div>
      <!-- ===================LOGIN INFO DIV==================== -->
      <div class="flex gap-[50px] mt-[30px]">
        <!-- first div -->
        <div
          class="w-[300px] h-[170px] p-[30px] flex gap-3 bg-[white] justify-between shadow-xl">
          <div class="h-[80px] flex-col mt-[15px] ml-[15px]">
            <h1 class="text-[20px] font-[600]">Login Code</h1>
            <p class="mt-[15px]">{{ store?.profile?.phone }}</p>
          </div>
          <div>
            <button @click="updateProfile">
              <svg-icon
                type="mdi"
                :path="mdiPencil"
                class="z-50 text-color1 cursor-pointer w-[30px] h-[30px]"></svg-icon>
            </button>
          </div>
        </div>
        <!-- second div -->
        <div
          class="w-[300px] h-[170px] p-[30px] flex gap-3 bg-[white] justify-between shadow-xl">
          <div class="h-[80px] flex-col mt-[15px] ml-[15px]">
            <h1 class="text-[20px] font-[600]">Password</h1>
            <p class="mt-[15px]">*****************</p>
          </div>
          <div>
            <button @click="updateProfile">
              <svg-icon
                type="mdi"
                :path="mdiPencil"
                class="z-50 text-color1 cursor-pointer w-[30px] h-[30px]"></svg-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "../../stores/auth";
import VButton from "../../components/form/VButton.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPencil, mdiTrashCanOutline, mdiSquareEditOutline } from "@mdi/js";
import { FormatDate } from "../../hooks/FormatDate";
// @ts-ignore
import profileModal from "./Modals/profileModal.vue";
// import { useUserProfileStore } from "../../stores/admin/profile";
import { onMounted, ref } from "vue";
const store = useAuthStore();
const profile_modal = ref();
const image = ref("");
const updateImage = () => {
  image.value = store?.profile?.image;
  // if (image.value) {
  //   image.value = `${import.meta.env.VITE_BASE_URL}/${store?.profile?.image}`;
  // } else {
  //   image.value;
  // }
  console.log("Image:", image.value);
};

const updateProfile = () => {
  profile_modal.value.openModal();
};
const changePassword = () => {
  profile_modal.value.openModal2();
};

onMounted(async () => {
  await store.getProfile();
  updateImage();
});
</script>

<style lang="scss" scoped></style>
