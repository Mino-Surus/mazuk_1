import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main.vue'
// import CourseDetail from '../components/CourseDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Main },
    // { path: '/course/:id', component: CourseDetail } 
  ]
})

export default router