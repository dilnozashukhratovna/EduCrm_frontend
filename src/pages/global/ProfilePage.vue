<template>
  <div class="w-full h-full flex items-center justify-center">
    <!-- <h1>Profile</h1> -->
    <profileModal ref="profile_modal" />
    <div class="w-[500px] flex flex-col gap-3">
      <img
        v-if="image"
        :src="image"
        class="w-[150px] h-[150px] rounded-full"
        alt="" />
      <img
        v-else
        src="../../assets/images/avatar.jpeg"
        class="w-[150px] h-[150px] rounded-full"
        alt="" />
      <p>
        Firstname:
        <span>{{ store?.profile?.first_name }}</span>
      </p>
      <p>
        Lastname:
        <span>{{ store?.profile?.last_name }}</span>
      </p>
      <p>
        Phone number:
        <span>{{ store?.profile?.phone }}</span>
      </p>
      <p>
        Role:
        <span>{{ store?.profile?.role }}</span>
      </p>
      <!-- <p>
        Password:
        <span>{{ store?.profile?.password }}</span>
      </p> -->
    </div>
    <VButton style="background-color: rgb(240, 185, 82)" @click="updateProfile"
      >Update Profile</VButton
    >
    <!-- <VButton style="background-color: rgb(240, 185, 82)" @click="changePassword"
      >Change Password</VButton
    > -->
  </div>
</template>

<script setup>
import { useAuthStore } from "../../stores/auth";
import VButton from "../../components/form/VButton.vue";
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
