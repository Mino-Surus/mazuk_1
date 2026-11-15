<template>
  <div class="dashboard-container">
    <div class="main-content">
      <div class="avatar"></div>
      <div class="user-info">
        <div class="user-name">{{ username }}</div>
        <div class="user-email">student@luvkorea.ru</div>
      </div>
      <ul class="menu-list">
        <li class="menu-item"><a href="/#course">My courses</a></li>
        <li class="menu-item">Help & Support</li>
        <li class="menu-item">Account Settings</li>
        <li class="menu-item">Personal information</li>
        <li class="menu-item">Share with Friends</li>
      </ul>
      <button @click="logout" class="logout-btn">Выйти</button>
    </div>
    
    <div class="sidebar">
      <div class="level-card">
        <div class="level-title">YOUR LEVEL</div>
        <div class="level">{{ studentLevel }}</div>
        <button class="view-button">VIEW</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('Студент')
const studentLevel = ref('LITE')

onMounted(() => {
  const user = localStorage.getItem('user')
  if (!user) {
    router.push('/login')
  } else {
    username.value = user
  }
})

const logout = () => {
  localStorage.removeItem('user')
  router.push('/')
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  font-family: sans-serif;
  background: #f5f5f5;
}

.main-content {
  flex: 2;
  padding: 50px;
  background: white;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
  background-image: url('/media/avatar.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.user-name {
  font-size: 2rem;
  font-family: 'Paytone One', sans-serif;
  color: #481F6B;
}

.user-email {
  color: #777;
  margin-bottom: 30px;
}

.menu-list {
  list-style: none;
  padding: 0;
}

.menu-item {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  font-size: 1.2rem;
  color: #481F6B;
  cursor: pointer;
}

.menu-item a {
  text-decoration: none;
  color: inherit;
}

.sidebar {
  flex: 1;
  padding: 50px;
  background: #481F6B;
  color: white;
}

.level-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 20px;
  text-align: center;
}

.level-title {
  font-size: 0.8rem;
  letter-spacing: 2px;
  margin-bottom: 15px;
  text-transform: uppercase;
}

.level {
  font-size: 4rem;
  font-family: 'Paytone One', sans-serif;
  margin-bottom: 20px;
  text-transform: uppercase;
  text-align: center;
  line-height: 1;
  color: #FF62A7;
}

.view-button {
  background: #FF62A7;
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 50px;
  cursor: pointer;
  font-family: 'Paytone One', sans-serif;
  transition: 0.3s;
}

.view-button:hover {
  background: white;
  color: #481F6B;
}

.logout-btn {
  margin-top: 30px;
  background: transparent;
  border: 1px solid #FF62A7;
  color: #FF62A7;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  transition: 0.3s;
}

.logout-btn:hover {
  background: #FF62A7;
  color: white;
}
</style>