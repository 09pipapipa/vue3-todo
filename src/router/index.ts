import { createRouter, createWebHistory } from 'vue-router'

import MainTodo from '@/views/MainTodo.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'mainTodo',
      component: MainTodo
    }
  ]
})

export default router
