<template>
  <!-- <div class="w-full h-screen flex justify-between">
    <Sidebar :menu="AdminMenu" class="w-[223px] h-full bg-global1 pt-[70px]">
    </Sidebar>
    <div class="right">
      <Header></Header>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div> -->
  <div class="w-full h-screen flex bg-[#E7EDF0] overflow-x-auto">
    <Sidebar />
    <div class="w-full flex flex-col">
      <Header />
      <div class="overflow-auto h-full">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/header/Sidebar.vue";
import Header from "@/components/header/Header.vue";
// import { AdminMenu } from "@/components/menu/AdminMenu.js";
</script>

<style lang="scss" scoped>
// .right {
//   // width: calc((100% - 224px));
//   // width: 100%;
// }
</style>
