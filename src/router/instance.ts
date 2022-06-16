import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default.vue'

export const loginUrl = '/login'

export const menuList: RouteRecordRaw[] = [
  {
    path: '/user',
    name: 'User',
    meta: {
      title: '用户管理'
    },
    component: () => import('@/views/user/index.vue')
  },
  {
    path: '/question',
    name: 'Question',
    meta: {
      title: '问卷管理'
    },
    component: () => import('@/views/question/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: menuList
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue')
    }
  ]
})

export default router
