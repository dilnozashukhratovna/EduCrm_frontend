<template>
  <app-modal v-model="dialog">
    <h1
      class="text-center text-[30px] text-color1 font-[500] mb-[30px]"
      v-if="!forms._id">
      Create role
    </h1>
    <h1 class="text-center text-[30px] text-color1 font-[500] mb-[30px]" v-else>
      Edit role
    </h1>
    <vee-form
      :validation-schema="schema"
      @submit="send"
      :initial-values="forms">
      <VInput
        type="text"
        name="name"
        label="RoleName"
        placeholder="Role name..."></VInput>
      <!-- <VInput
        type="text"
        name="description"
        label="Description"
        placeholder="Description..."></VInput> -->
      <VTextarea
        type="text"
        name="description"
        label="Description"
        placeholder="Description..."></VTextarea>

      <VButton btn_type="primary" :isLoading="loading" type="submit">
        {{ btn_title }}
      </VButton>
    </vee-form>
  </app-modal>

  <app-modal v-model="dialog2">
    <VDelete v-model="dialog2" :delete-function="deleteRole" name="role" />
  </app-modal>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import AppModal from "../../../components/ui/app-modal.vue";
import VInput from "../../../components/form/VInput.vue";
import VDelete from "../../../components/form/VDelete.vue";
import VTextarea from "../../../components/form/VTextarea.vue";
import VButton from "../../../components/form/VButton.vue";
import { useRoleStore } from "../../../stores/director/roles";
import Notification from "../../../plugins/Notification";
const dialog = ref(false);
const dialog2 = ref(false);
const store = useRoleStore();
const loading = ref(false);
const is_active = ref(false);
const roleId = ref(false);
const schema = computed(() => {
  return {
    name: "required|min:3|max:30",
    description: "required|min:3|max:100",
  };
});

let forms = ref({
  name: "",
  description: "",
});

watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});
const openModal = (item) => {
  if (item) forms.value = { ...item };
  dialog.value = true;
};
const openDeleteModal = (id) => {
  if (id) {
    roleId.value = id;
    dialog2.value = true;
  }
};

const btn_title = computed(() => {
  if (store.loading) {
    return "Loading";
  } else {
    return "Save";
  }
});

const deleteRole = async () => {
  loading.value = true;
  // group.value = await getOneGroup();
  // console.log("One group in delete func:", group.value);
  await store.deleteRole(roleId.value);
  loading.value = false;
  dialog2.value = false;
  location.reload();
  Notification("Role deleted!", "success");
};

const send = async (values) => {
  console.log(values);
  if (!values._id) {
    try {
      loading.value = true;
      await store.createRole(values);
      loading.value = false;
      dialog.value = false;
      location.reload();
      Notification("Role created!", "success");
    } catch (error) {
      console.log("Error in creating role in roleModal:", error);
      Notification("Error occured!", "danger");
    }
  } else {
    console.log("Payload from edit:", values);
    loading.value = true;
    await store.updateRole(values, values._id);
    loading.value = false;
    dialog.value = false;
    location.reload();
  }
};

defineExpose({ openModal, openDeleteModal });
</script>

<style lang="scss" scoped></style>
