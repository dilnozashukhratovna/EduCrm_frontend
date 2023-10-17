<template>
  <app-modal v-model="dialog">
    <vee-form
      :validation-schema="schema"
      @submit="send"
      :initial-values="forms">
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
        {{ btn_title }}
      </VButton>
    </vee-form>
  </app-modal>
  <app-modal v-model="dialog2">
    <h1 class="ml-[40px]">Are you sure you want to delete this student?</h1>
    <div class="mt-[30px]">
      <button
        class="p-[10px] w-[100px] bg-color1 text-white ml-[90px]"
        @click="dialog2 = false">
        CANCEL
      </button>
      <button
        class="p-[10px] w-[100px] bg-[crimson] text-white ml-[30px]"
        @click="deleteStudent">
        DELETE
      </button>
    </div>
  </app-modal>
</template>

<script setup>
import AppModal from "../../../components/ui/app-modal.vue";
import VInput from "../../../components/form/VInput.vue";
import VButton from "../../../components/form/VButton.vue";
import Loader from "../../../components/loader/Loader.vue";
import { useAdminStore } from "../../../stores/admin";
import Notification from "../../../plugins/Notification";
import { ref, computed, reactive, watch } from "vue";
const dialog = ref(false);
const dialog2 = ref(false);
const loading = ref(false);
const studentId = ref(null);
const store = useAdminStore();
watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});

let forms = ref({
  first_name: "",
  last_name: "",
  phone: "",
});

const btn_title = computed(() => {
  if (loading.value) {
    return "Loading";
  } else {
    if (forms.value.phone) {
      return "Edit Student";
    } else {
      return "Add Student";
    }
  }
});

const schema = computed(() => {
  return {
    first_name: "required|min:3|max:30",
    last_name: "required|min:3|max:30",
    phone: "required|phone:19",
  };
});

const openModal = (item) => {
  if (item) forms.value = { ...item };
  dialog.value = true;
};

const openDeleteModal = (id) => {
  console.log(id, "id");
  if (id) {
    studentId.value = id;
    dialog2.value = true;
  }
};

const send = async (values) => {
  if (!values._id) {
    const payload = {
      first_name: values.first_name,
      last_name: values.last_name,
      phone: values.phone
        .split("")
        .filter((char) => char === "+" || !isNaN(+char))
        .join(""),
    };
    loading.value = true;
    await store.createStudent(payload);
    Notification("Student created!", "success");
    loading.value = false;
    dialog.value = false;
    location.reload();
  } else {
    const payload = {
      first_name: values.first_name,
      last_name: values.last_name,
      phone: values.phone
        .split("")
        .filter((char) => char === "+" || !isNaN(+char))
        .join(""),
    };
    console.log("Payload from edit:", payload);
    loading.value = true;
    await store.updateStudent(payload, forms.value._id);
    loading.value = false;
    dialog.value = false;
    location.reload();
  }
};
const deleteStudent = async () => {
  await store.deleteStudent(studentId.value);
  dialog2.value = false;
  location.reload();
  Notification("Student deleted!", "success");
};

defineExpose({ openModal, openDeleteModal });
</script>

<style lang="scss" scoped></style>
