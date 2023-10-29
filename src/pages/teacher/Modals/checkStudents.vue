<template>
  <AppModal v-model="dialog">
    <h1 class="text-center text-[25px] text-global1 font-[600] mb-[30px]">
      Students attendance
    </h1>
    <vee-form id="form" @submit="save" :validation-schema="schema">
      <VInput
        type="text"
        name="title"
        placeholder="Enter today's lesson topic..."></VInput>
    </vee-form>
    <div
      v-for="(item, index) in store?.lessons"
      :key="index"
      class="flex items-center w-full justify-between my-3">
      <span
        >{{ item?.student?.first_name }} {{ item?.student?.last_name }}</span
      >
      <!-- <span v-if="present">present</span>
      <span v-else>absent</span> -->
      <div>
        <button @click="handleChange(index)" type="button">
          <span v-if="item?.participated" class="text-[green]">present</span>
          <span v-else class="text-[crimson]">absent</span>
          <!-- {{ item?.participated ? "present" : "absent" }} -->
        </button>
      </div>
    </div>
    <div class="mt-[50px]">
      <VButton
        form="form"
        btn_type="primary"
        type="submit"
        :isLoading="store?.loading"
        >save</VButton
      >
    </div>
  </AppModal>
  <table-loader v-if="store?.loading"></table-loader>
</template>

<script setup>
import { computed, ref } from "vue";
import AppModal from "../../../components/ui/app-modal.vue";
import { useTeacherSingleGroupStore } from "../../../stores/teacher/single_group";
import VButton from "../../../components/form/VButton.vue";
import VInput from "../../../components/form/VInput.vue";
import TableLoader from "../../../components/loader/TableLoader.vue";
const dialog = ref(false);
const store = useTeacherSingleGroupStore();
const present = ref(true);
const openModal = () => {
  dialog.value = true;
};

const handleChange = (index) => {
  store.lessons[index].participated = !store.lessons[index].participated;
};

const schema = computed(() => {
  return {
    title: "required|min:3|max:100",
  };
});

const save = async (value) => {
  let id = store.lessons[0].lesson._id;
  await store.updateSingleLesson(store?.lessons);
  await store.updateSingleLessonAttendance(id, value.title);
  dialog.value = false;
  //   console.log("ID", store?.lessons[0].lesson._id);
  //   console.log("Value:", value);
};

defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
