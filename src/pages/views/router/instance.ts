import { createRouter, createWebHashHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

export const loginUrl = '/login'

const formRoutes = routes.filter(i => String(i.path).includes('/form'))

console.log(formRoutes)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: formRoutes
})

export default router
