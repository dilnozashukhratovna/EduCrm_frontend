<template>
  <app-modal v-model="dialog">
    <div class="flex flex-col items-center justify-center">
      <img
        v-if="store?.image"
        :src="store?.image"
        alt=""
        class="w-[100px] h-[100px] rounded-full" />
      <input type="file" @change="handleChange($event)" />
      <vee-form
        :validation-schema="schema"
        @submit="editProfile"
        :initial-values="store?.profile">
        <VInput
          type="text"
          name="first_name"
          label="FirstName"
          placeholder="First name..."></VInput>
        <VInput
          type="text"
          name="last_name"
          label="LastName"
          placeholder="Last name..."></VInput>
        <VInput
          type="text"
          name="phone"
          label="Phone"
          placeholder="(+998)-90-123-45-67"
          :mask="'(+998)-##-###-##-##'"></VInput>
        <VButton btn_type="primary" :isLoading="loading" type="submit">
          edit
        </VButton>
      </vee-form>
    </div>
    <!-- //======================================================== -->
  </app-modal>
  <app-modal v-model="dialog2">
    <input
      type="text"
      v-model="passwords.old_password"
      placeholder="Old Password"
      class="p-[15px] border-2" />
    <input
      type="text"
      v-model="passwords.new_password"
      placeholder="New Password"
      class="p-[15px] border-2" />
    <input
      type="text"
      v-model="passwords.confirm_password"
      placeholder="Confirm Password"
      class="p-[15px] border-2" />
    <button class="p-[15px] border-2" @click="changePassword">send</button>
  </app-modal>
</template>

<script setup>
import AppModal from "../../../components/ui/app-modal.vue";
import { ref, computed, reactive, watch } from "vue";
import VInput from "../../../components/form/VInput.vue";
import { useAuthStore } from "../../../stores/auth";
import VButton from "../../../components/form/VButton.vue";
const dialog = ref(false);
const dialog2 = ref(false);
const store = useAuthStore();
const loading = ref(false);
const openModal = () => {
  dialog.value = true;
};

const openModal2 = () => {
  dialog2.value = true;
};
const schema = computed(() => {
  return {
    first_name: "min:3|max:30",
    last_name: "min:3|max:30",
    phone: "phone:19",
  };
});

const handleChange = async (e) => {
  const form = new FormData();
  form.append("image", e.target.files[0]);
  await store.updateImage(form);
};

const editProfile = async (values) => {
  loading.value = true;
  const payload = {
    first_name: values?.first_name,
    last_name: values?.last_name,
    phone: values?.phone
      .split("")
      .filter((char) => char === "+" || !isNaN(+char))
      .join(""),
    image: store?.image,
  };
  await store.updateProfile(payload);
  console.log("Profile data from editProfile func:", values);
  loading.value = false;
};

const passwords = ref({
  old_password: "",
  new_password: "",
  confirm_password: "",
});

const changePassword = async () => {
  await store.changePassword(passwords.value);
  console.log("Passwords from func:", passwords.value);
};

defineExpose({ openModal, openModal2 });
</script>

<style lang="scss" scoped></style>
