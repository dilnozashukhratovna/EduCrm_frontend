<template>
  <app-modal v-model="dialog">
    <div>
      <div v-if="store2.courses">
        <select class="m-3 border-2" v-model="groupPayload.course_id">
          <option value="" selected hidden>Select course</option>
          <option
            :value="item._id"
            v-for="(item, index) in store2.courses"
            :key="index">
            {{ item.name }}
          </option>
        </select>
      </div>
      <input
        type="text"
        v-model="groupPayload.name"
        placeholder="Name"
        class="border-2 mb-3" />
      <div class="block">
        <el-date-picker
          v-model="value2"
          type="date"
          placeholder="Start date"
          :default-value="new Date()"
          @change="handleChangeData($event)" />
      </div>
      <div>
        <select @change="handleChangeDays($event)" class="m-3 border-2">
          <option value="" selected hidden>Select days</option>
          <option value="odd">Odd days</option>
          <option value="even">Even days</option>
        </select>
      </div>
      <div class="demo-range">
        <el-time-picker
          v-model="value1"
          is-range
          range-separator="To"
          start-placeholder="Start time"
          end-placeholder="End time"
          @change="handleChangeTime($event)" />
      </div>
      <div v-if="store.availableRooms">
        <select class="m-3 border-2" v-model="groupPayload.room_id">
          <option value="" selected hidden>Select room</option>
          <option
            :value="item._id"
            v-for="(item, index) in store?.availableRooms"
            :key="index">
            {{ item.name }}
          </option>
        </select>
      </div>
      <br />
      <button @click="send" class="border-2">Send</button>
    </div>
  </app-modal>
  <!-- ===========DELETE MODAL======================= -->
  <app-modal v-model="dialog2">
    <VDelete
      v-model="dialog2"
      :delete-function="deleteGroup"
      name="group"></VDelete>
  </app-modal>
</template>

<script setup>
import AppModal from "../../../components/ui/app-modal.vue";
import VInput from "../../../components/form/VInput.vue";
import VButton from "../../../components/form/VButton.vue";
import Loader from "../../../components/loader/Loader.vue";
import VDelete from "../../../components/form/VDelete.vue";
import { useGroupStore } from "../../../stores/admin/group";
import { useCourseStore } from "../../../stores/admin/course";
import Notification from "../../../plugins/Notification";
import { ref, computed, reactive, watch } from "vue";
import moment from "moment";
const dialog = ref(false);
const dialog2 = ref(false);
const loading = ref(false);
const groupId = ref(null);
const store = useGroupStore();
const store2 = useCourseStore();
const group = ref(null);
const groupPayload = reactive({
  name: "",
  start_date: "",
  days: true,
  start_time: null,
  end_time: null,
  room_id: "",
  course_id: "",
  status: true,
});
const value1 = ref([new Date(), new Date()]);
const value2 = ref("");
watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});

let forms = ref({});

const btn_title = computed(() => {
  if (loading.value) {
    return "Loading";
  } else {
    if (forms.value._id) {
      return "Edit Group";
    } else {
      return "Add Group";
    }
  }
});

const handleChangeDays = (e) => {
  if (e.target.value == "odd") groupPayload.days = true;
  else groupPayload.days = false;
};

const handleChangeTime = async (e) => {
  let a = e[0].getHours();
  let b = e[0].getMinutes();
  let c = e[1].getHours();
  let d = e[1].getMinutes();
  groupPayload.start_time = a * 60 + b;
  groupPayload.end_time = c * 60 + d;
  await store.availableAdminRooms({
    start_date: groupPayload.start_date,
    start_time: groupPayload.start_time,
    end_time: groupPayload.end_time,
    days: groupPayload.days,
  });
};
const handleChangeData = (e) => {
  groupPayload.start_date = moment(e).format("YYYY-MM-DD");
};

// const schema = computed(() => {
//   return {
//     name: "required|min:3|max:30",
//     size: "required|min:2|max:30",
//   };
// });

const openModal = (item) => {
  //   if (item) forms.value = { ...item };
  dialog.value = true;
};

const openDeleteModal = (id) => {
  console.log(id, "id");
  if (id) {
    groupId.value = id;
    dialog2.value = true;
  }
};

const send = async (values) => {
  // if (!values._id) {
  //   loading.value = true;
  //   await store.createGroup(groupPayload);
  //   Notification("Group created!", "success");
  //   loading.value = false;
  //   dialog.value = false;
  //   location.reload();
  // } else {
  //   console.log("Payload from edit:", values);
  //   loading.value = true;
  //   await store.updateGroup(values, forms.value._id);
  //   loading.value = false;
  //   dialog.value = false;
  //   location.reload();
  // }
  loading.value = true;
  await store.createGroup(groupPayload);
  Notification("Group created!", "success");
  loading.value = false;
  dialog.value = false;
  location.reload();
};
const deleteGroup = async () => {
  loading.value = true;
  // group.value = await getOneGroup();
  // console.log("One group in delete func:", group.value);
  await store.deleteGroup(groupId.value);
  loading.value = false;
  dialog2.value = false;
  location.reload();
  Notification("Group deleted!", "success");
};

const getOneGroup = async () => {
  loading.value = true;
  group.value = await store.getOneGroup(groupId.value);
  console.log("One group in getOneGroup func:", group.value);
  loading.value = false;
  dialog2.value = false;
  // location.reload();
};

defineExpose({ openModal, openDeleteModal });
</script>

<style scoped>
.demo-range .el-date-editor {
  margin: 8px;
}

.demo-range .el-range-separator {
  box-sizing: content-box;
}

.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
