<template>
  <div class="w-full h-screen flex justify-center items-center bg-[#E7EDF0]">
    <!-- <div class="w-1/2 flex justify-center items-center h-full">
      <img
        src="@/assets/images/login_image.jpg"
        alt="login_page_image"
        class="w-full scale-90 h-full object-cover" />
    </div> -->
    <div
      class="w-[65%] flex flex-col justify-center items-center gap-8 bg-[#E7EDF0] h-full">
      <div class="w-full text-center">
        <h1
          class="text-[36px] text-global1 font-medium font-mono tracking-wider select-none">
          LOGIN
        </h1>
        <p class="text-[20px] text-global1"></p>
      </div>
      <vee-form
        :validation-schema="schema"
        @submit="save"
        class="w-3/5 flex flex-col gap-5">
        <VInput
          type="text"
          name="phone"
          label="Phone"
          placeholder="(+998)-90-123-45-67"
          :mask="'(+998)-##-###-##-##'"></VInput>
        <VPasswordInput
          name="password"
          placeholder="**********"></VPasswordInput>
        <VButton btn_type="primary" :isLoading="loading" type="submit">
          {{ btn_title }}
        </VButton>
      </vee-form>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import VInput from "@/components/form/VInput.vue";
import VPasswordInput from "@/components/form/VPasswordInput.vue";
import Loader from "@/components/loader/Loader.vue";
import { useAuthStore } from "../../stores/auth";
import VButton from "@/components/form/VButton.vue";
import Notification from "../../plugins/Notification";

const authStore = useAuthStore();
const schema = computed(() => {
  return {
    phone: "required|phone:19",
    password: "required|min:3|max:15",
  };
});

const loading = ref(false);
const btn_title = computed(() => {
  if (loading.value) {
    return "Loading";
  } else {
    return "Send";
  }
});

const save = async (values) => {
  loading.value = true;
  await authStore.login({
    phone: values.phone
      .split("")
      .filter((char) => char === "+" || !isNaN(+char))
      .join(""),
    password: values.password,
  });
  if (authStore.error) {
    Notification(authStore.error, "danger");
    authStore.error = null;
  } else {
    Notification("You've successfully logged in", "success");
  }
  console.log(authStore.user);
  loading.value = false;
};
</script>

<style lang="scss" scoped></style>
