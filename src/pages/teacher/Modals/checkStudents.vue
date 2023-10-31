<template>
  <AppModal v-model="dialog">
    <h1 class="text-center text-[25px] text-global1 font-[600] mb-[30px]">
      Students attendance
    </h1>
    <vee-form
      id="form"
      @submit="save"
      :validation-schema="schema"
      :initial-values="store?.lessons[0].lesson">
      <VInput
        type="text"
        name="title"
        placeholder="Enter today's lesson topic..."
        :disabled="store?.lessons[0]?.lesson?.pass"></VInput>
    </vee-form>
    <div
      v-for="(item, index) in store?.lessons"
      :key="index"
      class="flex items-center w-full justify-between my-3 border-b-2 border-grey p-[8px]">
      <span
        >{{ item?.student?.first_name }} {{ item?.student?.last_name }}</span
      >
      <div>
        <el-switch
          v-model="item.participated"
          :active-value="true"
          :inactive-value="false"
          :disabled="item?.lesson?.pass"
          class="ml-2"
          style="
            --el-switch-on-color: #13ce66;
            --el-switch-off-color: #ff4949;
          " />
      </div>
    </div>
    <div class="mt-[50px]" v-if="!store?.lessons[0]?.lesson?.pass">
      <VButton
        form="form"
        btn_type="create"
        type="submit"
        :isLoading="store?.loading"
        >save</VButton
      >
    </div>
  </AppModal>
</template>

<script setup>
import { computed, ref } from "vue";
import AppModal from "../../../components/ui/app-modal.vue";
import { useTeacherSingleGroupStore } from "../../../stores/teacher/single_group";
import VButton from "../../../components/form/VButton.vue";
import VInput from "../../../components/form/VInput.vue";
const dialog = ref(false);
const store = useTeacherSingleGroupStore();
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
  store.updateSingleLessonAttendance(id, value.title);
  dialog.value = false;
};

defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
