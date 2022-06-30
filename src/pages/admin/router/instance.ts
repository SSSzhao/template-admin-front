import { createRouter, createWebHashHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
// import type { RouteRecordRaw } from 'vue-router'
// import Layout from '@/layouts/default.vue'

export const loginUrl = '/login'

const adminRoutes = routes.filter(i => String(i.path).includes('/admin'))

console.log(adminRoutes)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(adminRoutes)
})

export default router
