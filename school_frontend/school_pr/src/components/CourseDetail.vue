<template>
  <div class="course-page" v-if="course">
    <div class="course-info-card">
      <div class="course-image-side">
        <img :src="`/media/course_${course.id}.jpg`" alt="Course Image" class="main-image">
      </div>
            
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
        
        <router-link to="/" class="start-button" style="text-decoration: none; display: inline-block; text-align: center;">Start Now</router-link>
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
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  padding: 20px;
  box-sizing: border-box;
}

.course-info-card {
  display: flex;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  width: 100%;
  min-height: 600px;
}

.course-image-side {
  flex: 1;
  background-color: #481F6B;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-description {
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.course-header {
  margin-bottom: 30px;
}

.word-1 {
  font-family: Anton, sans-serif;
  font-size: 2rem;
  color: #FF5794;
}

.word-2 {
  font-family: Anton, sans-serif;
  font-size: 2rem;
  color: #481F6B;
}

.course-header p {
  color: #777;
  font-size: 14px;
  margin-top: 10px;
  line-height: 1.5;
}

h2 {
  font-family: 'Paytone One', sans-serif;
  font-size: 2.5rem;
  color: #481F6B;
  margin-bottom: 20px;
  line-height: 1.2;
}

.desc-text {
  color: #555;
  line-height: 1.6;
  margin-bottom: 40px;
}

.information {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
}

.info h3 {
  font-family: 'Paytone One', sans-serif;
  font-size: 1.2rem;
  color: #481F6B;
  margin-bottom: 5px;
}

.info p {
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
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