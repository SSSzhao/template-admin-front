<template>
  <n-breadcrumb>
    <n-breadcrumb-item>问卷系统</n-breadcrumb-item>
    <n-breadcrumb-item
      v-for="(item, index) in breadcrumbs"
      :key="item.path"
      :href="breadcrumbs.length - 1 === index ? '' : item.path"
      >{{ item.meta.title }}</n-breadcrumb-item
    >
  </n-breadcrumb>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const route = useRoute()

const breadcrumbs = computed(() => {
  const routes = route.matched.slice(1)
  return routes
})
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb'
}
</script>
<style lang="scss" scoped></style>
