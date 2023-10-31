<template>
  <app-modal v-model="dialog">
    <h1
      class="text-center text-[30px] text-global1 font-[500] mb-[30px]"
      v-if="!forms._id">
      Create student
    </h1>
    <h1
      class="text-center text-[30px] text-global1 font-[500] mb-[30px]"
      v-else>
      Edit student
    </h1>
    <vee-form @submit="send" :initial-values="forms">
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
      <input type="file" @change="handleChange($event)" class="mb-[30px]" />

      <VButton btn_type="primary" :isLoading="loading" type="submit">
        save
      </VButton>
    </vee-form>
  </app-modal>
  <app-modal v-model="dialog2">
    <VDelete
      v-model="dialog2"
      :delete-function="deleteStudent"
      name="student" />
  </app-modal>
</template>

<script setup>
import AppModal from "../../../components/ui/app-modal.vue";
import VInput from "../../../components/form/VInput.vue";
import VButton from "../../../components/form/VButton.vue";
import { useStudentStore } from "../../../stores/admin/student";
import Notification from "../../../plugins/Notification";
import { ref, computed, reactive, watch } from "vue";
import VDelete from "../../../components/form/VDelete.vue";
import { useAuthStore } from "../../../stores/auth";
const dialog = ref(false);
const dialog2 = ref(false);
const loading = ref(false);
const studentId = ref(null);
const store = useStudentStore();
const store2 = useAuthStore();
const student = ref(null);
watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});

let forms = ref({
  first_name: "",
  last_name: "",
  phone: "",
  image: "",
});

const handleChange = async (e) => {
  const form = new FormData();
  form.append("image", e.target.files[0]);
  forms.image = form;
  await store2.updateImage(form);
};

const schema = computed(() => {
  return {
    first_name: "required|min:3|max:30",
    last_name: "required|min:3|max:30",
    phone: "required|phone:19",
    image: "required",
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
      image: store2?.image,
    };
    loading.value = true;
    await store.createStudent(payload);
    loading.value = false;
    dialog.value = false;
  } else {
    const payload = {
      first_name: values.first_name,
      last_name: values.last_name,
      phone: values.phone
        .split("")
        .filter((char) => char === "+" || !isNaN(+char))
        .join(""),
      image: store2?.image,
    };
    console.log("Payload from edit:", payload);
    loading.value = true;
    await store.updateStudent(payload, forms.value._id);
    console.log("Image:", image);
    loading.value = false;
    dialog.value = false;
  }
};
const deleteStudent = async () => {
  loading.value = true;
  await store.deleteStudent(studentId.value);
  loading.value = false;
  dialog2.value = false;
};

const getOneStudent = async () => {
  loading.value = true;
  student.value = await store.getOneStudent(studentId.value);
  console.log("One student in getOneStudent func:", student.value);
  loading.value = false;
  dialog2.value = false;
  // location.reload();
};

defineExpose({ openModal, openDeleteModal });
</script>

<style lang="scss" scoped></style>
