<template>
  <app-modal v-model="dialog">
    <h1
      class="text-center text-[30px] text-color1 font-[500] mb-[30px]"
      v-if="!forms._id">
      Create cource
    </h1>
    <h1 class="text-center text-[30px] text-color1 font-[500] mb-[30px]" v-else>
      Edit cource
    </h1>
    <vee-form
      :validation-schema="schema"
      @submit="send"
      :initial-values="forms">
      <VInput
        type="text"
        name="name"
        label="CourseName"
        placeholder="Course name..."></VInput>
      <VInput
        type="number"
        name="price"
        label="CoursePrice"
        placeholder="Course price..."></VInput>
      <VInput
        type="number"
        name="period"
        label="CoursePeriod"
        placeholder="Course period..."></VInput>
      <VButton btn_type="primary" :isLoading="loading" type="submit">
        {{ btn_title }}
      </VButton>
    </vee-form>
  </app-modal>
  <app-modal v-model="dialog2">
    <VDelete v-model="dialog2" :delete-function="deleteCourse" name="course" />
  </app-modal>
</template>

<script setup>
import AppModal from "../../../components/ui/app-modal.vue";
import VInput from "../../../components/form/VInput.vue";
import VButton from "../../../components/form/VButton.vue";
import Loader from "../../../components/loader/Loader.vue";
import VDelete from "../../../components/form/VDelete.vue";
import { useCourseStore } from "../../../stores/admin/course";
import Notification from "../../../plugins/Notification";
import { ref, computed, reactive, watch } from "vue";
const dialog = ref(false);
const dialog2 = ref(false);
const loading = ref(false);
const courseId = ref(null);
const store = useCourseStore();
const course = ref(null);
watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});

let forms = ref({
  name: "",
  price: null,
  period: null,
});

const btn_title = computed(() => {
  if (store.loading) {
    return "Loading";
  } else {
    return "Save";
  }
});

const schema = computed(() => {
  return {
    name: "required|min:3|max:30",
    price: "required|min:2|max:30",
    period: "required|min:1|max:30",
  };
});

const openModal = (item) => {
  if (item) forms.value = { ...item };
  dialog.value = true;
};

const openDeleteModal = (id) => {
  console.log(id, "id");
  if (id) {
    courseId.value = id;
    dialog2.value = true;
  }
};

const send = async (values) => {
  if (!values._id) {
    loading.value = true;
    await store.createCourse(values);
    Notification("Course created!", "success");
    loading.value = false;
    dialog.value = false;
    location.reload();
  } else {
    console.log("Payload from edit:", values);
    loading.value = true;
    await store.updateCourse(values, forms.value._id);
    loading.value = false;
    dialog.value = false;
    location.reload();
  }
};
const deleteCourse = async () => {
  loading.value = true;
  // course.value = await getOneCourse();
  // console.log("One course in delete func:", course.value);
  await store.deleteCourse(courseId.value);
  loading.value = false;
  dialog2.value = false;
  location.reload();
  Notification("Course deleted!", "success");
};

const getOneCourse = async () => {
  loading.value = true;
  course.value = await store.getOneCourse(courseId.value);
  console.log("One course in getOneCourse func:", course.value);
  loading.value = false;
  dialog2.value = false;
  // location.reload();
};

defineExpose({ openModal, openDeleteModal });
</script>

<style lang="scss" scoped></style>
