<template>
  <div class="app-container">
    <header class="header">
      <div class="logo">LUVKOREA.</div>
      <nav class="nav">
        <ul>
          <li><a href="#main">Главная</a></li>
          <li><a href="#forwho">О нас</a></li>
          <li><a href="#course">Курсы</a></li>
          <li><a href="#contact">Контакты</a></li>
        </ul>
        <a href="#" class="button">Sign in</a>
      </nav>
    </header>

    <div id="main" class="content">
      <h1>
        <div> KOREAN </div>
        <div>LANGUAGE</div>
      </h1>
      <p>
        Start learning Korean right now! Quick and easy
        <br> 
        with LuvKorea!
      </p>
    </div>
    
    <div class="forwho">
      <div class="container">
        <div class="section-header">
          <h1 class="main-title">
            <span class="word-1"> THE TRAINING IS </span> 
            <span class="word-2"> SUITABLE </span> 
          </h1>
        </div>
        
        <div id="forwho" class="cards-container">
          <div class="card">
            <h2 class="card-title">LITE</h2>
            <p class="card-text">If you want to learn Korean from scratch, our training program will help you master it quickly.</p>
          </div>
          
          <div class="card">
            <h2 class="card-title">MEDIUM </h2>
            <p class="card-text">if you have previously studied a language, but you want to improve your level, then the course will help you with this task.</p>
          </div>
          
          <div class="card">
            <h2 class="card-title">HARD</h2>
            <p class="card-text">If you need to take a Korean language proficiency test (TOPIK) for work or study, our course will help prepare you for it.</p>
          </div>
        </div>
      </div>
    </div>
    
    <section id="course" class="courses-section">
      <h2 class="section-title">LUVKOREA</h2>
      
      <div class="courses-controls">
        <div class="filter-form">
          <div class="search-box">
            <input 
              type="text" 
              v-model="searchQuery" 
              @input="fetchCourses"
              placeholder="Поиск курсов..." 
              class="search-input"
            >
            <button type="button" class="search-button"></button>
          </div>
          
          <select v-model="levelFilter" @change="fetchCourses" class="filter-select">
            <option value="">Все уровни</option>
            <option value="lite">Lite</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button @click="resetFilters" class="reset-button">Сбросить</button>
        </div>
      </div>
      
      <div class="courses-scroll-container">
        <div class="courses-scroll">
          
          <div v-for="course in courses" :key="course.id" class="course-card">
            <img :src="`/media/course_${course.id}.jpg`" alt="Корейский язык" class="course-image">
            
            <h3>{{ course.name }}</h3>
            <p>{{ course.description }}</p>
            <p class="course-level"><b> Уровень: {{ course.level }} </b></p>
            
            <router-link :to="'/course/' + course.id" class="button" style="text-decoration: none; color: white; display: inline-block; padding: 10px 20px;">
              View
            </router-link>
          </div>

          <div v-if="courses.length === 0" class="course-card">
            <p>Курсы пока не добавлены</p>
          </div>

        </div>
      </div>
    </section> 

    <footer>  
      <div id="contact" class="footer">
        <div class="logo">LUVKOREA</div>
        
        <div class="links">
          <a href="#main">Main</a>
          <a href="#lesson">Lesson</a>
          <a href="#forwho">For who</a>
          <a href="#course">Courses</a>
          <a href="#login">Log in</a>
          <a href="#about">About course</a>
        </div>
        <div class="contact">luvkorea@mail.ru</div>
      </div>
    </footer> 
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const courses = ref([]);
const searchQuery = ref('');
const levelFilter = ref('');

const fetchCourses = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/courses/', {
      params: {
        search: searchQuery.value,
        level: levelFilter.value
      }
    });
    courses.value = response.data;
  } catch (error) {
    console.error("Ошибка при загрузке курсов:", error);
  }
};

const resetFilters = () => {
  searchQuery.value = '';
  levelFilter.value = '';
  fetchCourses();
};

onMounted(() => {
  fetchCourses();
});
</script>

<style>
.header {
    font-family: sans-serif;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    height: 95px;
    background-color: rgba(255, 255, 255, 0.5);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.header .logo { align-items: center; font-family: Paytone One; font-size: 24px; font-weight: bold; }
.header .nav { display: flex; align-items: center; gap: 20px; }
.header .nav ul { list-style: none; margin: 0; padding: 0; display: flex; align-items: center; }
.header .nav ul li a { margin-left: 20px; text-decoration: none; color: #ffffff; font-weight: 500; }
.header .nav ul li a:hover { color: #FF62A7; }

.content {
    background-image: url('/media/header.png');
    background-size: cover;        
    background-position: center;   
    background-repeat: no-repeat;
    font-family: sans-serif;
    box-sizing: border-box;
    line-height: 1.6;
    padding-top: 60px; 
    min-height: 100vh;            
}

.section-header { text-align: center; margin-bottom: 50px; }
.container { max-width: 1200px; margin: 0 auto; }

.forwho {
    display: grid;
    align-content: center;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    margin: 0;
    background-color: #481F6B;
}

.main-title { align-content: center; padding-left: 0%; font-size: 2.5rem; font-weight: bold; margin-bottom: 10px; }
.main-title .word-1 { color: #ffffff; }
.main-title .word-2 { color: #FF5794; }

.courses-section {
    background-repeat: no-repeat;
    box-sizing: border-box;
    background: url('/media/courses.png');
    padding: 40px 20px;
    margin: 0;
    width: 100%;
}

.filter-select {
    background-color: #ffffff;
    padding: 10px 15px;
    border: 1px solid #ffffff;
    border-radius: 20px;
    font-size: 14px;
    font-family: sans-serif;
    color: #FF5794;
    min-width: 180px;
    margin: 0 0 30px 20px;
}

.section-title { padding: 0%; text-align: center; color: white; font-size: 2rem; margin-bottom: 30px; }

.search-box {
    color: #ffffff;
    margin-left: 20px;
    margin-bottom: 20px;
    display: flex;
    height: 50px;
    width: 300px;
    background: #FF62A7;
    border-radius: 50px;
    box-shadow: 0 5px 15px rgba(231, 21, 112, 0.1);
    transition: all 0.3s ease;
    overflow: hidden; 
}

.search-box:focus-within { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(255, 36, 124, 0.192); }
.search-input { flex: 1; padding: 15px 25px; border: none; background: transparent; font-size: 16px; color: #ffffff; outline: none; }
.search-input::placeholder { color: #ffffff; }

.search-button {
    border: none;
    background: transparent; 
    height: 50px;
    width: 50px;
    background-image: url('/media/search.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 20px 20px; 
    cursor: pointer;
    transition: all 0.3s ease;
}

.search-button:hover { background-color: rgba(255, 98, 167, 0.1); }

.reset-button {
    font-size: 15px;
    font-family: sans-serif;
    text-decoration: none;
    background: #ffffff;
    color: #FF5794;
    border: none;
    padding: 10px 20px;
    border-radius: 100px;
    cursor: pointer;
    font-weight: 500;
    margin-left: 20px;
}

.cards-container { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }

.card {
    background: white;
    border-radius: 10px;
    padding: 30px;
    flex: 1;
    align-content: center;
    min-width: 300px;
    max-width: 350px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.card-title { align-content: center; padding: 0%; font-size: 1.5rem; margin-bottom: 15px; color: #481F6B; }

.course-card h3 {
    line-height: 1.1;          
    font-size: 18px;          
    font-weight: bold;
    min-height: 2.2em;  
    padding: 0%;
    font-size: 2rem;
    color: #FF62A7;
    margin-top: 0%;
    margin-left: 20px;
    margin-bottom: 10px;
}

.course-card {
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    width: 400px;
    background: white;
    border-radius: 10px;
    padding: 20px;
    flex-shrink: 0;
}

.course-card p { font-family: sans-serif; padding: 0%; margin-left: 20px; color: #555; line-height: 1.5; margin-bottom: 25px; }
.card-text { font-family: sans-serif; align-content: center; padding: 0%; color: #481F6B; line-height: 1.5; }

.button {
    font-family: sans-serif;
    text-decoration: none;
    background: #FF62A7;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 100px;
    cursor: pointer;
    font-weight: 500;
    margin-left: 20px;
}

.course-image { width: 100%; height: 250px; border-radius: 8px 8px 0 0; display: block; margin-bottom: 30px; }

.courses-scroll { display: inline-flex; gap: 20px; padding: 10px; min-width: min-content; margin-bottom: 30px; }
.courses-scroll-container { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
.courses-scroll-container::-webkit-scrollbar { height: 8px; }
.courses-scroll-container::-webkit-scrollbar-thumb { background: #FF7AAB; border-radius: 4px; }

.footer { background: #FF7AAB; color: white; padding: 30px 20px; text-align: center; font-family: sans-serif; align-items: center; }
.logo { font-family: Paytone One; font-size: 2rem; margin-bottom: 20px; }
.links { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-bottom: 20px; }
.links a { color: white; text-decoration: none; }
.contact { font-family: sans-serif; text-align: center; padding: 0%; margin: 0%; font-size: 0.8rem; }

.lang-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background: #FF7AAB;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    z-index: 9999;
    font-size: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); 
    transition: all 0.3s ease;      
}

.lang-btn:hover { background: #481F6B; }

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(72, 31, 107, 0.9); 
    z-index: 10000;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
}

.modal-content {
    background: white;
    padding: 40px;
    border-radius: 20px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    text-align: center;
    animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}

.modal-content h2 { font-family: 'Paytone One', sans-serif; font-size: 28px; color: #481F6B; margin-bottom: 25px; padding: 0; text-align: center; line-height: normal; }
.modal-content input {
    width: 100%;
    padding: 12px 15px;
    margin: 10px 0;
    border: 2px solid #FF7AAB;
    border-radius: 50px;
    font-size: 14px;
    font-family: sans-serif;
    outline: none;
    transition: all 0.3s ease;
    box-sizing: border-box;
}

.modal-content input:focus { border-color: #481F6B; box-shadow: 0 0 5px rgba(72, 31, 107, 0.3); }
.modal-content input::placeholder { color: #999; }

.modal-content button {
    width: 100%;
    padding: 12px;
    background: #FF62A7;
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-size: 16px;
    font-family: 'Paytone One', sans-serif;
    margin-top: 15px;
    transition: all 0.3s ease;
}

.modal-content button:hover { background: #481F6B; transform: translateY(-2px); }

.close-btn {
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    color: #FF7AAB;
    transition: all 0.3s ease;
    line-height: 1;
    margin-top: -20px;
    margin-right: -20px;
}

.close-btn:hover { color: #481F6B; transform: scale(1.1); }

.error-message { color: #FF4757; font-size: 12px; margin-top: 5px; display: none; text-align: left; padding-left: 15px; }
.modal-content h2, .modal-content p, .modal-content input, .modal-content button { padding-left: 0; padding-right: 0; }
.modal-content input { padding-left: 15px; padding-right: 15px; }

h1 {
    padding-bottom: 2vw;
    padding-left: 13vw;
    padding-top: 5vw;
    padding-bottom: 0%;
    font-family: Oswald;
    color: #481F6B;
    font-size: 7rem;
    line-height: 120px;
}

h2 {
    padding-bottom: 2vw;
    padding-left: 13vw;
    padding-top: 5vw;
    padding-bottom: 0%;
    font-family: Anton;
    color: #ffffff;
    font-size: 3rem;
    line-height: 120px;
}

h3 {
    padding-bottom: 2vw;
    padding-left: 13vw;
    padding-top: 5vw;
    padding-bottom: 0%;
    font-family: Anton;
    color: #FF5794;
    font-size: 3rem;
    line-height: 120px;
}

p {
    font-size: 20px;
    padding-left: 10vw;
    color: #ffffff;
}
</style>