<template>
  <singleGroupModal ref="modal_value"></singleGroupModal>
  <table-loader v-if="loading"></table-loader>
  <div class="p-[20px] pl-[30px]">
    <el-collapse>
      <el-collapse-item key="1" name="1">
        <template #title>
          <div class="custom-title2">
            <svg-icon
              type="mdi"
              :path="mdiBookOpenVariant"
              class="text-global1 mr-[20px] w-[40px] h-[40px]"></svg-icon>
            ALL LESSONS
          </div>
        </template>
        <div class="w-full flex gap-2 flex-wrap">
          <!-- <table-loader v-if="store?.loading"></table-loader> -->
          <div v-for="(item, index) in store?.group_lessons" :key="index">
            <el-popover
              placement="top-start"
              :title="`Lesson #${item?.number}`"
              :width="200"
              trigger="hover"
              transition="100 linear"
              :content="
                item?.description
                  ? item?.description
                  : item?.title
                  ? item?.title
                  : 'coming soon'
              ">
              <template #reference>
                <div
                  @click="openModal(item)"
                  class="w-[40px] h-[40px] px-[5px] flex items-center justify-center rounded-lg cursor-pointer"
                  :class="
                    item?.pass
                      ? 'bg-global1 text-[#fff] border-none'
                      : item?.paid && !item?.description
                      ? 'bg-[#d3d3d3] text-[grey] border-none'
                      : 'bg-[crimson] text-[#fff] border-none'
                  ">
                  {{ FormatDateAttendance(item?.date) }}
                </div>
              </template>
            </el-popover>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
  <!-- <div class="w-[600px] mt-[100px] ml-[200px]">
    <input
      type="text"
      placeholder="Phone Number"
      class="p-[15px] w-[100%] rounded-full"
      v-model="phone" />
    <div class="w-[600px] mt-[50px] ml-[13px]">
      <button class="border-2 p-[20px]" @click="send">Add Student</button>
    </div>
  </div> -->
</template>

<script setup>
import { useRoute } from "vue-router";
import VInput from "../../components/form/VInput.vue";
import VButton from "../../components/form/VButton.vue";
import { useGroupStudentStore } from "../../stores/admin/single_group";
import { onMounted, ref } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMenu, mdiBookOpenVariant } from "@mdi/js";
import TableLoader from "../../components/loader/TableLoader.vue";
import { FormatDateAttendance } from "../../hooks/FormatDate";
import singleGroupModal from "./Modals/singleGroupModal.vue";
const route = useRoute();
const groupId = route.params.id;
const phone = ref("");
const store = useGroupStudentStore();
const modal_value = ref("");
const loading = ref(false);
console.log(phone);

const send = async () => {
  let payload = {
    group: groupId,
    student_phone: phone.value,
  };
  await store.createGroupStudent(payload);
};

const openModal = (item) => {
  console.log(item);
  if (!item.pass) modal_value.value.openModal(item);
};

onMounted(() => {
  loading.value = true;
  store.getSingleGroupLessons(groupId);
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.el-collapse-item {
  color: #12486b;
  padding: 8px;
  border: 1px solid #12486b;
  margin: 8px 0;
  background-color: #fff;
  border-radius: 10px;
}

.custom-title {
  font-size: 20px;
  border: none;
  color: #12486b;
  padding-left: 15px;
}

.custom-title2 {
  font-size: 18px;
  border: none;
  color: #12486b;
  display: flex;
}
</style>
