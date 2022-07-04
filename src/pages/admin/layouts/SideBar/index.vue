<template>
  <n-scrollbar class="h-screen">
    <div class="h-16"></div>
    <n-menu
      :collapsed-width="54"
      :collapsed-icon-size="22"
      :indent="24"
      :options="menus"
      :render-label="renderMenuLabel"
      :value="defaultValue"
    />
  </n-scrollbar>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { getRoutes } from '@admin/router/instance'

const menus = computed(() => {
  const routes = getRoutes()
  return setMenu(routes)
})

const setMenu = (routes: RouteRecordRaw[]): MenuOption[] => {
  return routes
    .filter(i => i.meta && i.meta.title && !i.meta.layout)
    .map(i => {
      return {
        label: i.meta?.title,
        key: i.path,
        children: i.children?.length ? setMenu(i.children) : undefined
      }
    })
}

const defaultValue = computed(() => {
  const route = useRoute()
  const { path } = route
  return path
})

const renderMenuLabel = (option: MenuOption) => {
  return option.children?.length
    ? (option.label as string)
    : h(
        RouterLink,
        {
          to: {
            path: option.key as string
          }
        },
        { default: () => option.label }
      )
}
</script>
<script lang="ts">
export default {
  name: 'SideBar'
}
</script>
