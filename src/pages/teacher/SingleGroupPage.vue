<!-- <template>
  <div class="p-[20px] pl-[30px]">
    <h1 class="text-[#002842] font-Inter text-[22px] font-[600] uppercase">
      Students
    </h1>
    <div class="mt-[20px]">
      <el-collapse>
        <el-collapse-item
          :title="`${item?.student?.first_name} ${item?.student?.last_name}`"
          :name="item?.student?._id"
          v-for="(item, index) in store?.attendance"
          :key="index">
          <div>
            <h1 v-if="item?.student?.first_name !== null">
              {{ item?.student?.first_name }}
            </h1>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template> -->
<template>
  <div class="p-[20px] pl-[30px]">
    <div class="mb-[20px] flex justify-between items-center">
      <h1 class="text-[#002842] font-Inter text-[22px] font-[600] uppercase">
        students
      </h1>
      <button @click="openModal">
        <svg-icon
          type="mdi"
          :path="mdiMenu"
          class="text-global1 mr-[30px] w-[40px] h-[40px]"></svg-icon>
      </button>
    </div>
    <div class="w-[100%]">
      <el-collapse>
        <el-collapse-item
          v-for="(item, index) in store?.attendance"
          :key="index"
          :name="item?.student?._id">
          <template #title>
            <div class="custom-title">
              {{ `${item?.student?.first_name} ${item?.student?.last_name}` }}
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
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useTeacherSingleGroupStore } from "../../stores/teacher/single_group";
import { useRoute } from "vue-router";
import { FormatDate, FormatDateAttendance } from "../../hooks/FormatDate";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMenu } from "@mdi/js";
const route = useRoute();
const store = useTeacherSingleGroupStore();
const groupId = route.params.id;
const params = ref({
  page: 1,
  limit: 10,
  last_page: null,
});

onMounted(async () => {
  await store.getTeacherSingleGroup(groupId);
  await store.getStudentsAttendance(groupId, params.value);
});
</script>

<style lang="scss" scoped>
.el-collapse-item {
  color: #12486b;
  padding: 15px;
  border: 1px solid #12486b;
  margin: 8px 0;
  background-color: #fff;
}

.custom-title {
  font-size: 18px;
  border: none;
  color: #12486b;
}
</style>
