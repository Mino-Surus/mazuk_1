<template>
  <div class="my-courses-page">
    <div class="header-area">
      <h1>Мои курсы</h1>
      <router-link to="/student" class="back-btn">← В кабинет</router-link>
    </div>
    
    <div class="courses-list" v-if="courses.length > 0">
      <div v-for="item in courses" :key="item.id" class="course-card">
        <div class="card-content">
          <h3>{{ item.course_name }}</h3>
          <p class="level">Уровень: {{ item.course_level }}</p>
          <p class="desc">{{ item.course_description }}</p>
        </div>
        <router-link :to="'/course/' + item.course_id" class="btn">Перейти к урокам</router-link>
      </div>
    </div>
    
    <div v-else class="empty-msg">
      <p>Вы пока не записаны ни на один курс.</p>
      <router-link to="/#course" class="btn">Найти курсы</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const courses = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('/api/my-courses/')
    courses.value = res.data
  } catch (error) {
    console.error("Ошибка загрузки курсов:", error)
  }
})
</script>

<style scoped>
.my-courses-page {
  padding: 40px 20px;
  min-height: 100vh;
  background: #f5f5f5;
  font-family: sans-serif;
  box-sizing: border-box;
}

.header-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 10px;
}

h1 {
  color: #481F6B;
  font-family: 'Paytone One', sans-serif;
  font-size: 2.5rem;
  margin: 0;
}

.back-btn {
  text-decoration: none;
  color: #FF62A7;
  font-weight: bold;
  font-size: 1.1rem;
  transition: 0.3s;
}

.back-btn:hover {
  color: #481F6B;
}

.courses-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.course-card {
  background: white;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
}

.card-content {
  flex-grow: 1;
}

.course-card h3 {
  color: #481F6B;
  font-family: 'Paytone One', sans-serif;
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 15px;
  line-height: 1.3;
}

.course-card .level {
  color: #FF62A7;
  font-weight: bold;
  margin-bottom: 10px;
}

.course-card .desc {
  color: #555;
  line-height: 1.5;
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.btn {
  display: inline-block;
  text-align: center;
  padding: 12px 20px;
  background: #FF62A7;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-family: 'Paytone One', sans-serif;
  transition: background 0.3s ease;
  width: 100%;
  box-sizing: border-box;
}

.btn:hover {
  background: #481F6B;
}

.empty-msg {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
  max-width: 600px;
  margin: 100px auto;
  background: white;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
}
</style>