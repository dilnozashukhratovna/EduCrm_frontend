<template>
  <appModal v-model="dialog">
    <vee-form
      :validation-schema="schema"
      @submit="send"
      :initial-values="forms">
      <VTextarea
        placeholder="Enter the reason..."
        label="Description"
        name="description">
      </VTextarea>
      <div class="mt-[30px]">
        <VButton btn_type="create" type="submit" :isLoading="store?.loading"
          >Save</VButton
        >
      </div>
    </vee-form>
  </appModal>
</template>

<script setup>
import { computed, ref } from "vue";
import appModal from "../../../components/ui/app-modal.vue";
import VTextarea from "../../../components/form/VTextarea.vue";
import VButton from "../../../components/form/VButton.vue";
import { useGroupStudentStore } from "../../../stores/admin/single_group";

const store = useGroupStudentStore();
const itemId = ref();
const schema = computed(() => {
  return {
    description: "required|min:3|max:100",
  };
});

const dialog = ref(false);
const forms = ref({});

const openModal = (item) => {
  if (item) {
    forms.value = { ...item };
    itemId.value = item._id;
  }
  dialog.value = true;
  console.log("itemId:", itemId.value);
};

const send = async (value) => {
  console.log(value);
  if (value.number) {
    console.log("Entered to send function", value.description);
    await store.updateSingleGroupLesson(itemId.value, {
      ...value,
      paid: false,
    });
    dialog.value = false;
  } else {
    let payload = {
      comment: value.description,
      participated: false,
    };
    await store.updateSingleGroupStudent(forms.value.lesson, payload);
    dialog.value = false;
  }
};

defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
