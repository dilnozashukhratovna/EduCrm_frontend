<template>
  <table class="custom-table">
    <thead>
      <tr>
        <td
          v-for="(item, index) in props.headers"
          :key="index"
          scope="col"
          class="th">
          <span
            v-if="item.title === 'checkbox'"
            class="w-full flex justify-center items-center"
            ><input type="checkbox" class="w-[18px] h-[18px]"
          /></span>
          <span v-else>
            {{ item.title }}
          </span>
        </td>
      </tr>
    </thead>
    <tbody>
      <template v-if="props.body && props.body.length">
        <tr v-for="(item, index) in props.body" :key="index">
          <td v-for="(item2, index2) in props.headers" :key="index2">
            <slot :name="`body_${item2.value}`" :item="item">{{
              item[item2.value]
            }}</slot>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td :colspan="props.headers.length" class="center-text">No data</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup>
import { useStudentStore } from "../../stores/admin/student";
const store = useStudentStore();
const props = defineProps({
  headers: {
    type: Array,
  },
  body: {
    type: Array,
  },
});
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap");
.custom-table {
  font-family: "Inter", sans-serif;
  width: 100%;
  margin-bottom: 30px;
}

.custom-table .th {
  background-color: #12486b;
  text-align: left;
  color: white;
  // padding-right: 20px;
  // padding-left: 30px;
  // padding-top: 18px;
  // padding-bottom: 13px;
  padding: 16px;
  font-weight: 600;
}

.custom-table td {
  text-align: left;
  // padding-right: 20px;
  // padding-left: 30px;
  // padding-top: 20px;
  // padding-bottom: 15px;
  padding: 16px;
  color: #065fd4;
  font-weight: 500;
}

.custom-table tr {
  background: #f6fbff;
}
.custom-table tr:hover {
  cursor: pointer;
  background: #e8f4fd;
}

.center-text {
  text-align: center !important;
  font-size: 20px !important;
  padding: 25px !important;
  color: #12486b !important;
}
</style>
