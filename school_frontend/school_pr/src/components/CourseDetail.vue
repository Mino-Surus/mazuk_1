<template>
  <div class="course-page" v-if="course">
    <div class="course-info-card">
      <div class="course-image-side"></div>
            
      <div class="course-description">
        <div class="course-header">
          <span class="word-1">ABOUT</span> 
          <span class="word-2">COURSE</span> 
          <p>Our courses cater to all proficiency levels, supported by passionate instructors who create a welcoming environment.</p>
        </div>

        <h2>{{ course.name }}</h2>
        <p class="desc-text">{{ course.description }}</p>
        
        <div class="information">
          <div class="info">
            <h3>{{ course.level }}</h3>
            <p>Course Level</p>
          </div>
          <div class="info">
            <h3>{{ course.teacher_name || 'Преподаватель' }}</h3>
            <p>Your Teacher</p>
          </div>
          <div class="info">
            <h3>{{ formatDate(course.enrollment_date) }}</h3>
            <p>Date</p>
          </div>
        </div>
        
        <router-link to="/" class="start-button">Start Now</router-link>
      </div>
    </div>
  </div>
  <div v-else class="loading">Загрузка...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const course = ref(null)

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

onMounted(async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/course/${route.params.id}/`)
    course.value = response.data
  } catch (error) {
    console.error('Ошибка при загрузке курса:', error)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Paytone+One&family=Oswald:wght@200..700&display=swap');

.course-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  background-color: #ffffff;
}

.course-info-card {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.course-image-side {
  flex: 1;
  background-image: url('/media/about.png');
  /* contain - вписывает картинку целиком, не обрезая */
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  /* Добавил белый фон, чтобы если картинка не заполняет блок, не было пустоты */
  background-color: #ffffff; 
}

.course-description {
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
}

.course-header {
  margin-bottom: 20px;
}

.word-1 {
  font-family: Anton, sans-serif;
  font-size: 1.5rem;
  color: #FF5794;
}

.word-2 {
  font-family: Anton, sans-serif;
  font-size: 1.5rem;
  color: #481F6B;
}

.course-header p {
  color: #777;
  font-size: 14px;
  margin-top: 10px;
  line-height: 1.5;
  padding: 0;
}

h2 {
  font-family: 'Paytone One', sans-serif;
  font-size: 2.5rem;
  color: #481F6B;
  margin-bottom: 20px;
  line-height: 1.2;
  padding: 0;
}

.desc-text {
  color: #555;
  line-height: 1.6;
  margin-bottom: 30px;
  padding: 0;
  font-size: 16px;
}

.information {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.info h3 {
  font-family: 'Paytone One', sans-serif;
  font-size: 1.2rem;
  color: #481F6B;
  margin-bottom: 5px;
  padding: 0;
  line-height: 1.2;
}

.info p {
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0;
  margin: 0;
}

.start-button {
  font-family: 'Paytone One', sans-serif;
  background: #FF62A7;
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.start-button:hover {
  background: #481F6B;
  transform: translateY(-2px);
}

.loading {
  text-align: center;
  font-size: 2rem;
  color: #481F6B;
  margin-top: 100px;
  font-family: 'Paytone One', sans-serif;
}
</style>