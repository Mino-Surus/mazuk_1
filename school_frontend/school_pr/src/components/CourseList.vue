<template>
  <div class="courses-section">
    <h2>Курсы</h2>
    
    <input v-model="searchQuery" @input="fetchCourses" placeholder="Поиск курсов...">
    
    <div class="courses-list">
      <div v-for="course in courses" :key="course.id" class="course-card">
        <h3>{{ course.name }}</h3>
        <p>{{ course.description }}</p>
        <p>Уровень: {{ course.level }}</p>
        <router-link :to="'/course/' + course.id" class="btn">Подробнее</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const courses = ref([]);
const searchQuery = ref('');

const fetchCourses = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/courses/', {
      params: {
        search: searchQuery.value
      }
    });
    courses.value = response.data;
  } catch (error) {
    console.error("Ошибка при загрузке курсов:", error);
  }
};

onMounted(() => {
  fetchCourses();
});
</script>