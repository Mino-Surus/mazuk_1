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
        
        <button @click="enrollCourse" class="start-button">Start Now</button>
      </div>
    </div>

    <div class="lessons-section">
      <h2>Уроки курса</h2>
      <div v-if="lessons.length > 0" class="lessons-list">
        <div v-for="lesson in lessons" :key="lesson.id" class="lesson-item">
          <h3>{{ lesson.title }}</h3>
          <p>{{ lesson.content }}</p>
          <small>Дата: {{ lesson.date }}</small>
        </div>
      </div>
      <p v-else>Уроков пока нет.</p>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Успех!</h2>
        <p>Вы записаны на курс!</p>
        <button @click="showModal = false" class="close-modal-btn">ОК</button>
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
const lessons = ref([])
const showModal = ref(false)

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const enrollCourse = async () => {
  try {
    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];

    const res = await axios.post(`/api/enroll/${route.params.id}/`, {}, {
      headers: { 'X-CSRFToken': csrfToken }
    })
    
    if (res.data.success) {
      showModal.value = true
    }
  } catch (error) {
    console.error("Ошибка записи:", error)
    alert("Ошибка при записи на курс")
  }
}

onMounted(async () => {
  try {
    const res = await axios.get(`/api/course/${route.params.id}/`)
    course.value = res.data
    
    const lessonsRes = await axios.get(`/api/course/${route.params.id}/lessons/`)
    lessons.value = lessonsRes.data
  } catch (error) {
    console.error('Ошибка при загрузке:', error)
  }
})
</script>

<style scoped>
.course-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
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
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
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

.lessons-section {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: sans-serif;
  width: 100%;
}

.lessons-section h2 {
  color: #481F6B;
  font-family: 'Paytone One', sans-serif;
  margin-bottom: 20px;
}

.lesson-item {
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0;
}

.lesson-item h3 {
  color: #FF62A7;
  margin-bottom: 10px;
  font-family: 'Paytone One', sans-serif;
}

.lesson-item p {
  color: #555;
  margin-bottom: 10px;
  line-height: 1.5;
  padding: 0;
}

.lesson-item small {
  color: #999;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.modal-content h2 {
  color: #481F6B;
  font-family: 'Paytone One', sans-serif;
  margin-bottom: 10px;
}

.modal-content p {
  margin-bottom: 20px;
  font-size: 1.1rem;
  color: #333;
}

.close-modal-btn {
  background: #FF62A7;
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 20px;
  cursor: pointer;
  font-family: 'Paytone One', sans-serif;
  font-size: 1rem;
  transition: 0.3s;
}

.close-modal-btn:hover {
  background: #481F6B;
}

.loading {
  text-align: center;
  font-size: 2rem;
  color: #481F6B;
  margin-top: 100px;
  font-family: 'Paytone One', sans-serif;
}
</style>