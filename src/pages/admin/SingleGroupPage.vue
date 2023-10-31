<template>
  <singleGroupModal ref="modal_value"></singleGroupModal>
  <table-loader v-if="loading"></table-loader>
  <div class="p-[20px] pl-[30px]">
    <!-- ============ COLLAPSE FOR LESSONS=============== -->
    <el-collapse>
      <el-collapse-item key="1" name="1">
        <template #title>
          <div class="custom-title2">
            <svg-icon
              type="mdi"
              :path="mdiBookOpenVariant"
              class="text-global1 mr-[20px] w-[40px] h-[40px]"></svg-icon>
            Schedule
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
    <!-- ============ COLLAPSE FOR STUDENTS=============== -->
    <div class="w-[100%]">
      <el-collapse>
        <el-collapse-item name="students" key="1">
          <template #title>
            <div class="custom-title2">
              <svg-icon
                type="mdi"
                :path="mdiAccountGroup"
                class="text-global1 mr-[20px] w-[40px] h-[40px]"></svg-icon>
              Total Students
            </div>
          </template>
          <el-collapse-item
            v-for="(item, index) in store?.single_group_students"
            :key="++index"
            :name="item?.student?._id">
            <template #title>
              <div class="custom-title">
                {{
                  `${index} ${item?.student?.first_name} ${item?.student?.last_name}`
                }}
              </div>
            </template>
            <div class="w-full flex gap-2 flex-wrap cursor-pointer">
              <div v-for="(item2, index2) in item.attendance" :key="index2">
                <el-popover
                  placement="top-start"
                  :title="FormatDate(item2.date)"
                  :width="200"
                  trigger="hover"
                  transition="100 linear"
                  :content="
                    item2?.comment
                      ? item2?.comment
                      : item2.participated
                      ? ''
                      : 'sababsiz'
                  ">
                  <template #reference>
                    <div
                      @click="openModal(item2)"
                      class="w-[40px] h-[40px] border-[1px] px-[5px] border-global1 flex items-center justify-center rounded-lg"
                      :class="
                        item2?.participated
                          ? 'text-global1'
                          : item2.comment
                          ? 'bg-[#fff] text-[crimson] border-[1px] border-[crimson]'
                          : 'bg-[crimson] text-[#fff] border-none'
                      ">
                      {{ FormatDateAttendance(item2?.date) }}
                    </div>
                  </template>
                </el-popover>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse-item>
        <!-- <el-collapse-item
          v-for="(item, index) in store?.single_group_students"
          :key="++index"
          :name="item?.student?._id">
          <template #title>
            <div class="custom-title">
              {{
                `${index} ${item?.student?.first_name} ${item?.student?.last_name}`
              }}
            </div>
          </template>
          <div class="w-full flex gap-2 flex-wrap">
            <div v-for="(item2, index2) in item.attendance" :key="index2">
              <el-popover
                placement="top-start"
                :title="FormatDate(item2.date)"
                :width="200"
                trigger="hover"
                transition="100 linear"
                :content="item2?.comment">
                <template #reference>
                  <div
                    class="w-[40px] h-[40px] border-[1px] px-[5px] border-global1 flex items-center justify-center rounded-lg"
                    :class="
                      item2?.participated
                        ? 'text-global1'
                        : 'bg-[crimson] text-[#fff] border-none'
                    ">
                    {{ FormatDateAttendance(item2?.date) }}
                  </div>
                </template>
              </el-popover>
            </div>
          </div>
        </el-collapse-item> -->
      </el-collapse>
    </div>
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
import { mdiMenu, mdiBookOpenVariant, mdiAccountGroup } from "@mdi/js";
import TableLoader from "../../components/loader/TableLoader.vue";
import { FormatDate, FormatDateAttendance } from "../../hooks/FormatDate";
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
  console.log("Item from openModal", item);
  if (item.number) {
    if (!item.pass) modal_value.value.openModal(item);
  } else {
    if (!item.comment) {
      modal_value.value.openModal(item);
    }
  }
  console.log(item);
};

onMounted(() => {
  loading.value = true;
  store.getSingleGroupLessons(groupId);
  store.getSingleGroupStudents(groupId);
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
