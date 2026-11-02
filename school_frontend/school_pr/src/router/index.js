import { createRouter, createWebHistory } from 'vue-router'
import CourseList from '../components/CourseList.vue'
// import CourseDetail from '../components/CourseDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: CourseList },
    // { path: '/course/:id', component: CourseDetail } 
  ]
})

export default router