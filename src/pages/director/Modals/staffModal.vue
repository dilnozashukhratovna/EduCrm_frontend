<template>
  <app-modal v-model="dialog">
    <h1
      class="text-center text-[30px] text-global1 font-[500] mb-[30px]"
      v-if="!forms._id">
      Create staff
    </h1>
    <h1
      class="text-center text-[30px] text-global1 font-[500] mb-[30px]"
      v-else>
      Edit staff
    </h1>
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
      <!-- <input type="file" @change="handleChange($event)" class="mb-[30px]" /> -->
      <VSelect
        label="Select a role"
        :options="role_store?.roles"
        name="role"
        @change="handleChange($event)"></VSelect>
      <VSelect
        label="Select a course"
        :options="course_store?.courses"
        name="course"
        v-if="is_active"></VSelect>

      <VButton btn_type="primary" :isLoading="loading" type="submit">
        {{ btn_title }}
      </VButton>
    </vee-form>
  </app-modal>

  <app-modal v-model="dialog2">
    <VDelete v-model="dialog2" :delete-function="deleteStaff" name="staff" />
  </app-modal>
</template>

<script setup>
import { computed, ref } from "vue";
import AppModal from "../../../components/ui/app-modal.vue";
import VInput from "../../../components/form/VInput.vue";
import VDelete from "../../../components/form/VDelete.vue";
import VButton from "../../../components/form/VButton.vue";
import VSelect from "../../../components/form/VSelect.vue";
import { useStaffStore } from "../../../stores/director/staffs";
import { useAuthStore } from "../../../stores/auth";
import { useCourseStore } from "../../../stores/admin/course";
import { useRoleStore } from "../../../stores/director/roles";
import Notification from "../../../plugins/Notification";
const dialog = ref(false);
const dialog2 = ref(false);
const store = useStaffStore();
const store2 = useAuthStore();
const course_store = useCourseStore();
const role_store = useRoleStore();
const loading = ref(false);
const is_active = ref(false);
const schema = computed(() => {
  return {
    first_name: "required|min:3|max:30",
    last_name: "required|min:3|max:30",
    phone: "required|phone:19",
    role: "required|min:3|max:100",
    course: "min:3|max:100",
  };
});
const forms = ref({});
const openModal = () => {
  dialog.value = true;
  course_store.getCourses();
  role_store.getRoles();
};
const openDeleteModal = () => {
  dialog2.value = true;
};

const handleChange = (e) => {
  let role = JSON.parse(e.target.value).name;
  if (role == "teacher") is_active.value = true;
  else is_active.value = false;
};

const btn_title = computed(() => {
  if (store.loading) {
    return "Loading";
  } else {
    return "Save";
  }
});

// const handleChange = async (e) => {
//   const form = new FormData();
//   form.append("image", e.target.files[0]);
//   forms.image = form;
//   await store2.updateImage(form);
// };

const deleteStaff = () => {
  console.log("hello");
};
const send = async (values) => {
  let payload = null;
  if (values.course) {
    payload = {
      ...values,
      role: JSON.parse(values.role)._id,
      course: JSON.parse(values.course)._id,
      phone: values.phone
        .split("")
        .filter((char) => char === "+" || !isNaN(+char))
        .join(""),
    };
  } else {
    payload = {
      ...values,
      role: JSON.parse(values.role)._id,
      phone: values.phone
        .split("")
        .filter((char) => char === "+" || !isNaN(+char))
        .join(""),
    };
  }

  try {
    loading.value = true;
    await store.createStaff(payload);
    Notification("Staff created!", "success");
    loading.value = false;
    dialog.value = false;
    // location.reload();
  } catch (error) {
    console.log("Error in creating staff in staffModal:", error);
    Notification("Error occured!", "danger");
  }
  console.log("Payload:", payload);
};

defineExpose({ openModal, openDeleteModal });
</script>

<style lang="scss" scoped></style>
