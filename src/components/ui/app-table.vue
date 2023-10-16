<template>
  <table class="custom-table">
    <thead>
      <tr>
        <td
          v-for="(item, index) in props.headers"
          :key="index"
          scope="col"
          class="th">
          {{ item.title }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in props.body" :key="index">
        <td v-for="(item2, index2) in props.headers" :key="index2">
          <slot :name="`body_${item2.value}`" :item="item">{{
            item[item2.value]
          }}</slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
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
  width: 90%;
  margin-bottom: 50px;
}

.custom-table .th {
  background-color: #12486b;
  text-align: left;
  color: white;
  padding: 10px;
}

.custom-table td {
  //padding: 5px;
  background: #f6fbff;
  color: #065fd4;
  font-weight: 400;
}
</style>
