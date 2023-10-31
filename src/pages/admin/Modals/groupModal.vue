<template>
  <app-modal v-model="dialog">
    <!-- MODAL TITLE -->
    <h1
      class="text-center text-[30px] text-global1 font-[500] mb-[30px]"
      v-if="!forms._id">
      Create group
    </h1>
    <h1
      class="text-center text-[30px] text-global1 font-[500] mb-[30px]"
      v-else>
      Edit group
    </h1>
    <!-- FORM -->
    <Form @submit="send" class="w-full">
      <!-- get group name -->
      <label for="name" class="text-[18px] text-global1 font-medium select-none"
        >GroupName</label
      >
      <Field
        rules="required"
        :model-value="forms.name"
        v-slot="{ errors }"
        name="group name">
        <input
          type="text"
          v-model="forms.name"
          placeholder="Group name..."
          id="name"
          class="w-full border outline-none rounded-lg px-3 py-2 text-[18px] placeholder:text-global1/50 focus:border-global1 mb-[10px]" />
        <p
          class="text-[16px] text-error_color select-none mb-[20px]"
          v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
      <!-- get start date -->
      <label
        for="start_date"
        class="text-[18px] text-global1 font-medium mb-1 select-none"
        >SelectDate</label
      >
      <Field
        rules="required"
        :model-value="forms.start_date"
        v-slot="{ errors }"
        name="start date">
        <el-date-picker
          v-model="date_time_picker.date"
          type="date"
          placeholder="Start date..."
          :default-value="new Date()"
          @change="handleChangeData($event)"
          style="
            width: 100%;
            height: 45px;
            font-size: 18px;
            margin-bottom: 10px;
            border-radius: 8px;
          " />
        <p
          class="text-[16px] text-error_color select-none mb-[20px]"
          v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
      <!-- get odd or even day -->
      <label
        for="start_date"
        class="text-[18px] text-global1 font-medium mb-1 select-none"
        >SelectDays</label
      >
      <Field
        rules="boolean"
        :model-value="forms.days"
        v-slot="{ errors }"
        name="days">
        <select
          @change="handleChangeDays($event)"
          class="w-full border outline-none rounded-lg px-3 py-2 text-[18px] placeholder:text-global1/50 focus:border-global1 mb-[10px]">
          <option value="" selected hidden>Select days...</option>
          <option value="odd">Odd days</option>
          <option value="even">Even days</option>
        </select>
        <p
          class="text-[16px] text-error_color select-none mb-[20px]"
          v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
      <!-- get start and end times -->
      <label
        for="start_date"
        class="text-[18px] text-global1 font-medium mb-1 select-none"
        >SelectTime</label
      >
      <Field
        rules="required"
        :model-value="forms.start_time && forms.end_time"
        v-slot="{ errors }"
        name="time">
        <el-time-picker
          v-model="date_time_picker.time"
          is-range
          range-separator="To"
          start-placeholder="Start time"
          end-placeholder="End time"
          @change="handleChangeTime($event)"
          style="
            width: 100%;
            height: 45px;
            font-size: 18px;
            margin-bottom: 10px;
            border-radius: 8px;
          " />
        <p
          class="text-[16px] text-error_color select-none mb-[20px]"
          v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
      <!-- get courses -->
      <label
        for="start_course"
        class="text-[18px] text-global1 font-medium mb-1 select-none"
        >SelectCourse</label
      >
      <Field
        rules="required"
        :model-value="forms.course"
        v-slot="{ errors }"
        name="course">
        <div v-if="course_store.courses">
          <select
            class="w-full border outline-none rounded-lg px-3 py-2 text-[18px] placeholder:text-global1/50 focus:border-global1 mb-[10px]"
            v-model="forms.course"
            @change="handleChangeCourse($event)">
            <option value="" selected hidden>Select course...</option>
            <option
              :value="item._id"
              v-for="(item, index) in course_store.courses"
              :key="index">
              {{ item.name }}
            </option>
          </select>
        </div>
        <p
          class="text-[16px] text-error_color select-none mb-[20px]"
          v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
      <!-- get available rooms -->
      <label
        v-if="store?.availableRooms"
        for="start_room"
        class="text-[18px] text-global1 font-medium mb-1 select-none"
        >SelectRoom</label
      >
      <Field
        rules="required"
        :model-value="forms.room"
        v-slot="{ errors }"
        name="room">
        <div v-if="store?.availableRooms">
          <select
            class="w-full border outline-none rounded-lg px-3 py-2 text-[18px] placeholder:text-global1/50 focus:border-global1 mb-[10px]"
            v-model="forms.room">
            <option value="" selected hidden>Select room</option>
            <option
              :value="item._id"
              v-for="(item, index) in store?.availableRooms"
              :key="index">
              {{ item.name }}
            </option>
          </select>
        </div>
        <p
          class="text-[16px] text-error_color select-none mb-[20px]"
          v-if="errors && errors.length && store?.availableRooms">
          {{ errors[0] }}
        </p>
      </Field>
      <!-- get available teachers -->
      <label
        v-if="store?.teachers.length"
        for="start_course"
        class="text-[18px] text-global1 font-medium mb-1 select-none"
        >SelectTeacher</label
      >
      <Field
        rules="required"
        :model-value="forms.teacher"
        v-slot="{ errors }"
        name="teacher">
        <div v-if="store?.teachers.length">
          <select
            v-model="forms.teacher"
            class="w-full border outline-none rounded-lg px-3 py-2 text-[18px] placeholder:text-global1/50 focus:border-global1 mb-[10px]">
            <option value="" selected hidden>Select teacher</option>
            <option
              :value="item._id"
              v-for="(item, index) in store?.teachers"
              :key="index">
              {{ item.first_name }} {{ item.last_name }}
            </option>
          </select>
        </div>
        <p
          class="text-[16px] text-error_color select-none mb-[20px]"
          v-if="errors && errors.length && store?.teachers.length">
          {{ errors[0] }}
        </p>
      </Field>

      <!-- send data button -->
      <div class="mt-[30px]">
        <VButton btn_type="primary" :isLoading="loading" type="submit">
          Send
        </VButton>
      </div>
    </Form>
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
import VButton from "../../../components/form/VButton.vue";
import VDelete from "../../../components/form/VDelete.vue";
import { useGroupStore } from "../../../stores/admin/group";
import { useCourseStore } from "../../../stores/admin/course";
import { Form, Field } from "vee-validate";
import { ref, watch } from "vue";
import moment from "moment";
const dialog = ref(false);
const dialog2 = ref(false);
const loading = ref(false);
const groupId = ref(null);
const store = useGroupStore();
const course_store = useCourseStore();
const group = ref(null);
const forms = ref({
  name: "",
  start_date: "",
  days: null,
  start_time: null,
  end_time: null,
  room: "",
  course: "",
  status: true,
  teacher: "",
});

const date_time_picker = ref({
  date: "",
  time: [new Date(), new Date()],
});

watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});

const handleChangeDays = (e) => {
  if (e.target.value == "odd") forms.value.days = true;
  else forms.value.days = false;
};

const handleChangeTime = async (e) => {
  let a = e[0].getHours();
  let b = e[0].getMinutes();
  let c = e[1].getHours();
  let d = e[1].getMinutes();
  forms.value.start_time = a * 60 + b;
  forms.value.end_time = c * 60 + d;
  await store.availableAdminRooms({
    start_date: forms.value.start_date,
    start_time: forms.value.start_time,
    end_time: forms.value.end_time,
    days: forms.value.days,
  });
};
const handleChangeData = (e) => {
  forms.value.start_date = moment(e).format("YYYY-MM-DD");
};

const handleChangeCourse = async (e) => {
  console.log(e.target.value);
  await store.getGroupTeacher(e.target.value);
};

const openModal = (item) => {
  console.log(item);
  if (item) forms.value = { ...item };
  dialog.value = true;
};

const openDeleteModal = (id) => {
  if (id) {
    groupId.value = id;
    dialog2.value = true;
  }
};

const send = async (values) => {
  // if (!values._id) {
  //   loading.value = true;
  //   await store.createGroup(forms);
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
  console.log("Group payload:", forms.value);
  loading.value = true;
  await store.createGroup({ ...forms.value });
  let result = {
    group: store?.group_id,
    teacher: forms.value.teacher,
  };
  await store.addGroupTeacher(result);
  loading.value = false;
  dialog.value = false;
};

const deleteGroup = async () => {
  loading.value = true;
  await store.deleteGroup(groupId.value);
  loading.value = false;
  dialog2.value = false;
  location.reload();
};

const getOneGroup = async () => {
  loading.value = true;
  group.value = await store.getOneGroup(groupId.value);
  console.log("One group in getOneGroup func:", group.value);
  loading.value = false;
  dialog2.value = false;
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
