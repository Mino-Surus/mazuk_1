import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main.vue'
import CourseDetail from '../components/CourseDetail.vue'
import Login from '../components/Login.vue'
import StudentDashboard from '../components/StudentDashboard.vue'
import MyCourses from '../components/MyCourses.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Main },
    { path: '/course/:id', component: CourseDetail },
    { path: '/login', component: Login },
    { path: '/student', component: StudentDashboard },
    { path: '/my-courses', component: MyCourses }
  ]
})

export default router