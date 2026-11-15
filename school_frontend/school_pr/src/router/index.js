import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main.vue'
import CourseDetail from '../components/CourseDetail.vue'
import Login from '../components/Login.vue'
import StudentDashboard from '../components/StudentDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Main },
    { path: '/course/:id', component: CourseDetail },
    { path: '/login', component: Login },
    { path: '/student', component: StudentDashboard }
  ]
})

export default router