<template>
  <app-modal v-model="dialog">
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
      <VButton btn_type="primary" :isLoading="loading" type="submit">
        {{ btn_title }}
      </VButton>
    </vee-form>
  </app-modal>
  <app-modal v-model="dialog2">
    <h1 class="ml-[40px]">
      Are you sure you want to delete this room?
      <!-- {{ store?.getOneRoom(roomId)?.first_name }}? -->
    </h1>
    <div class="mt-[30px]">
      <button
        class="p-[10px] w-[100px] bg-color1 hover:bg-[#073452] text-white ml-[90px] rounded-full"
        @click="dialog2 = false">
        CANCEL
      </button>
      <button
        class="p-[10px] w-[100px] bg-[crimson] hover:bg-[#ab0518] text-white ml-[30px] rounded-full"
        @click="deleteRoom">
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
import { useRoomStore } from "../../../stores/admin/room";
import Notification from "../../../plugins/Notification";
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

const btn_title = computed(() => {
  if (loading.value) {
    return "Loading";
  } else {
    if (forms.value.phone) {
      return "Edit Room";
    } else {
      return "Add Room";
    }
  }
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
    loading.value = true;
    await store.createRoom(values);
    Notification("Room created!", "success");
    loading.value = false;
    dialog.value = false;
    location.reload();
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
  // room.value = await getOneRoom();
  // console.log("One room in delete func:", room.value);
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
  // location.reload();
};

defineExpose({ openModal, openDeleteModal });
</script>

<style lang="scss" scoped></style>
