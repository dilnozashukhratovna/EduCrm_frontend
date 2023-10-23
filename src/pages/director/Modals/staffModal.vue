<template>
  <app-modal v-model="dialog">
    <h1
      class="text-center text-[30px] text-color1 font-[500] mb-[30px]"
      v-if="!forms._id">
      Create staff
    </h1>
    <h1 class="text-center text-[30px] text-color1 font-[500] mb-[30px]" v-else>
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
        :options="roles"
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
const dialog = ref(false);
const dialog2 = ref(false);
const store = useStaffStore();
const store2 = useAuthStore();
const course_store = useCourseStore();
const loading = ref(false);
const is_active = ref(false);
const schema = computed(() => {
  return {
    first_name: "required|min:3|max:30",
    last_name: "required|min:3|max:30",
    phone: "required|phone:19",
    role: "required|min:3|max:30",
    course: "required|min:3|max:30",
  };
});

const roles = ref([
  { name: "admin" },
  { name: "teacher" },
  { name: "finance" },
]);

const forms = ref({});
const openModal = () => {
  dialog.value = true;
  course_store.getCourses();
};
const openDeleteModal = () => {
  dialog2.value = true;
};

const handleChange = (e) => {
  if (e.target.value == "teacher") is_active.value = true;
  else is_active.value = false;
  console.log(e.target.value);
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
  console.log("Send values",values);
};

defineExpose({ openModal, openDeleteModal });
</script>

<style lang="scss" scoped></style>
