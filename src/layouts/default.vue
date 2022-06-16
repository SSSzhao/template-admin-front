<template>
  <n-layout has-sider class="layout">
    <n-layout-sider
      collapse-mode="width"
      :collapsed-width="54"
      :width="210"
      show-trigger="arrow-circle"
      class="sider"
    >
      <SideBar />
    </n-layout-sider>
    <n-layout>
      <n-layout-header>
        <NavBar />
      </n-layout-header>
      <n-layout-content>
        <AppMain />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
<script setup lang="ts">
import SideBar from './SideBar/index.vue'
import NavBar from './NavBar/index.vue'
import AppMain from './AppMain/index.vue'
</script>
<style lang="scss" scoped>
.layout {
  $header-height: 60px;
  :deep(.header) {
    height: $header-height;
    box-shadow: 0 0 6px rgba(220, 226, 234, 0.8);
  }
  .sider {
    box-shadow: 0px 0px 13px 0px rgba(206, 211, 219, 0.9);
  }
  :deep(.main) {
    max-height: calc(100vh - $header-height);
  }
}
</style>
