<template>
  <table-loader v-if="loading"></table-loader>
  <div v-else>
    <checkStudents ref="modal_value" />
    <uploadVideo ref="modal_value2" />
    <div class="p-[20px] pl-[30px]">
      <!-- ============TITLE DIV=============== -->
      <div class="mb-[20px] flex justify-between items-center">
        <h1 class="text-[#002842] font-Inter text-[22px] font-[600] uppercase">
          students ({{ store?.attendance?.length }})
        </h1>
        <div class="flex">
          <select
            @change="handleChangeSelectData($event)"
            class="outline-none rounded-lg mr-[30px] p-[10px] text-global1 text-[18px] font-[500]"
            :v-model="date">
            <option
              :value="item.date"
              v-for="(item, index) in store?.group_lessons"
              :key="index">
              {{ FormatDate(item?.date) }}
            </option>
          </select>
          <div class="w-30px mr-[30px] flex justify-center items-center gap-3">
            <VButton
              btn_type="primary"
              @click="openModal"
              :isLoading="loading_btn">
              <span
                ><svg-icon
                  type="mdi"
                  :path="mdiMenu"
                  class="text-[#fff] w-[30px] h-[30px]"></svg-icon></span
            ></VButton>
            <VButton btn_type="create" @click="openVideoModal"
              ><span>UploadVideo</span
              ><span
                ><svg-icon
                  type="mdi"
                  :path="mdiFileUpload"
                  class="text-[#fff] w-[30px] h-[30px] ml-[5px]"></svg-icon></span
            ></VButton>
          </div>
        </div>
      </div>
      <!-- ============ COLLAPSE FOR LESSONS=============== -->
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
                    class="w-[40px] h-[40px] px-[5px] flex items-center justify-center rounded-lg"
                    :class="
                      item?.pass
                        ? 'bg-global1 text-[#fff] border-none'
                        : item?.paid
                        ? 'bg-[#fff] text-global1 border-[1px] border-global1'
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
          <el-collapse-item
            v-for="(item, index) in store?.attendance"
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
                  :content="
                    item2?.comment
                      ? item2?.comment
                      : item2.participated
                      ? ''
                      : 'sababsiz'
                  ">
                  <template #reference>
                    <div
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
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useTeacherSingleGroupStore } from "../../stores/teacher/single_group";
import { useRoute } from "vue-router";
import { FormatDate, FormatDateAttendance } from "../../hooks/FormatDate";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMenu, mdiBookOpenVariant, mdiFileUpload } from "@mdi/js";
import checkStudents from "./Modals/checkStudents.vue";
import uploadVideo from "./Modals/uploadVideo.vue";
import VButton from "../../components/form/VButton.vue";
import TableLoader from "../../components/loader/TableLoader.vue";
const route = useRoute();
const loading = ref(false);
const loading_btn = ref(false);
const store = useTeacherSingleGroupStore();
const groupId = route.params.id;
const date = ref(FormatDate(new Date()));
const params = ref({
  page: 1,
  limit: 10,
  last_page: null,
});
const modal_value = ref("");
const modal_value2 = ref("");

const handleChangeSelectData = (e) => {
  date.value = FormatDate(e.target.value);
  console.log("Event:", e.target.value);
  // location.reload();
};

const openModal = async () => {
  loading_btn.value = true;
  await store.getSingleLesson(groupId, date.value);
  loading_btn.value = false;
  modal_value.value.openModal();
};

const openVideoModal = async () => {
  modal_value2.value.openModal();
};

onMounted(async () => {
  loading.value = true;
  await store.getStudentsAttendance(groupId, params.value);
  await store.getGroupLessons(groupId);
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
