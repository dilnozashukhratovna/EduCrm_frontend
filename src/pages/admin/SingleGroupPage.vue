<template>
  <div class="w-[600px] mt-[100px] ml-[200px]">
    <input
      type="text"
      placeholder="Phone Number"
      class="p-[15px] w-[100%] rounded-full"
      v-model="phone" />
    <div class="w-[600px] mt-[50px] ml-[13px]">
      <!-- <VButton btn_type="primary" :isLoading="loading" @click="send">
        Add Student
      </VButton> -->
      <button class="border-2 p-[20px]" @click="send">Add Student</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import VInput from "../../components/form/VInput.vue";
import VButton from "../../components/form/VButton.vue";
import { useGroupStudentStore } from "../../stores/admin/single_group";
import { ref } from "vue";
import Notification from "../../plugins/Notification";
const route = useRoute();
const id = route.params.id;
const phone = ref("");
const store = useGroupStudentStore();
console.log(phone);

const send = async () => {
  let payload = {
    group_id: id,
    student_phone: phone.value,
  };
  console.log("Hello");
  //   loading.value = true;
  await store.createGroupStudent(payload);
  Notification("Course created!", "success");
  //   loading.value = false;
  //   dialog.value = false;
  // location.reload();
};
</script>

<style lang="scss" scoped></style>
