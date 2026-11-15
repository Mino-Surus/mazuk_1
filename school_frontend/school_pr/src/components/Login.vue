<template>
  <div class="login-page">
    <div class="login-card">
      <h2>Вход в личный кабинет</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label>Логин</label>
          <input v-model="username" type="text" required placeholder="Введите логин" />
        </div>
        <div class="input-group">
          <label>Пароль</label>
          <input v-model="password" type="password" required placeholder="Введите пароль" />
        </div>
        <div v-if="error" class="error">{{ error }}</div>
        <button type="submit" class="login-btn">Войти</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    await axios.get('/api/csrf/', {
      withCredentials: true
    });

    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];

    if (!csrfToken) {
      error.value = 'Не удалось получить CSRF-токен.'
      return
    }

    const response = await axios.post('/api/login/', {
      username: username.value,
      password: password.value
    }, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrfToken
      }
    })
    
    if (response.data.success) {
      localStorage.setItem('user', response.data.username)
      router.push('/student')
    }
  } catch (err) {
    error.value = 'Неверный логин или пароль'
    console.error(err)
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  font-family: sans-serif;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  font-family: 'Paytone One', sans-serif;
  color: #481F6B;
  text-align: center;
  margin: 0 0 30px 0;
  padding: 0;
  font-size: 1.8rem;
  line-height: 1.2;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-size: 14px;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.input-group input:focus {
  border-color: #FF62A7;
  outline: none;
}

.login-btn {
  width: 100%;
  padding: 15px;
  background: #FF62A7;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-family: 'Paytone One', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.login-btn:hover {
  background: #481F6B;
}

.error {
  color: red;
  text-align: center;
  margin-bottom: 10px;
  font-size: 14px;
}
</style>