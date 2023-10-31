<template>
  <app-modal v-model="dialog">
    <h1
      class="text-center text-[30px] text-global1 font-[500] mb-[30px]"
      v-if="!forms._id">
      Create room
    </h1>
    <h1
      class="text-center text-[30px] text-global1 font-[500] mb-[30px]"
      v-else>
      Edit room
    </h1>
    <vee-form
      :validation-schema="schema"
      @submit="send"
      :initial-values="forms">
      <VInput
        type="text"
        name="name"
        label="RoomName"
        placeholder="Room name..."></VInput>
      <VInput
        type="number"
        name="size"
        label="RoomSize"
        placeholder="Room size..."></VInput>
      <div class="mt-[30px]">
        <VButton btn_type="primary" :isLoading="loading" type="submit">
          send
        </VButton>
      </div>
    </vee-form>
  </app-modal>
  <app-modal v-model="dialog2">
    <VDelete v-model="dialog2" :delete-function="deleteRoom" name="room" />
  </app-modal>
</template>

<script setup>
import AppModal from "../../../components/ui/app-modal.vue";
import VInput from "../../../components/form/VInput.vue";
import VButton from "../../../components/form/VButton.vue";
import { useRoomStore } from "../../../stores/admin/room";
import Notification from "../../../plugins/Notification";
import VDelete from "../../../components/form/VDelete.vue";
import { ref, computed, reactive, watch } from "vue";
const dialog = ref(false);
const dialog2 = ref(false);
const loading = ref(false);
const roomId = ref(null);
const store = useRoomStore();
const room = ref(null);
watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});

let forms = ref({
  name: "",
  size: null,
});

const schema = computed(() => {
  return {
    name: "required|min:3|max:30",
    size: "required|min:2|max:30",
  };
});

const openModal = (item) => {
  if (item) forms.value = { ...item };
  dialog.value = true;
};

const openDeleteModal = (id) => {
  console.log(id, "id");
  if (id) {
    roomId.value = id;
    dialog2.value = true;
  }
};

const send = async (values) => {
  if (!values._id) {
    try {
      loading.value = true;
      await store.createRoom(values);
      Notification("Room created!", "success");
      loading.value = false;
      dialog.value = false;
      location.reload();
    } catch (error) {
      console.log("Error in creating room in roomModal:", error);
      Notification("Error occured!", "danger");
    }
  } else {
    console.log("Payload from edit:", values);
    loading.value = true;
    await store.updateRoom(values, forms.value._id);
    loading.value = false;
    dialog.value = false;
    location.reload();
  }
};
const deleteRoom = async () => {
  loading.value = true;
  await store.deleteRoom(roomId.value);
  loading.value = false;
  dialog2.value = false;
  location.reload();
  Notification("Room deleted!", "success");
};

const getOneRoom = async () => {
  loading.value = true;
  room.value = await store.getOneRoom(roomId.value);
  console.log("One room in getOneRoom func:", room.value);
  loading.value = false;
  dialog2.value = false;
};

defineExpose({ openModal, openDeleteModal });
</script>

<style lang="scss" scoped></style>
