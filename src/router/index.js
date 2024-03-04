import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '../components/TodoList.vue'
import TaskDetails from '../components/TaskDetails.vue'

const routes = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoList
  },
  {
    path: '/task/:id',
    name: 'TaskDetails',
    component: TaskDetails,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
