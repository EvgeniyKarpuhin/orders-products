<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const currentDate = ref('')
const currentTime = ref('')

function updateTime() {
    const now = new Date()
    const options = {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }
    let formatDate = now.toLocaleString('ru-RU', options)
    formatDate = formatDate
    .replace('г', '')
    .replace('.', '')
    // .trim()
    // formatDate = formatDate.replace(/\b\p{L}/gu, c => c.toUpperCase())
    currentDate.value = formatDate
    currentTime.value = now.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    })
}

let interval
onMounted(() => {
    updateTime()
    interval = setInterval(updateTime, 1000)
})

onUnmounted(() => clearInterval(interval))

</script>

<template>
    <header class="top-menu animate__animated animate__fadeInDown">
    <div class="top-menu__content">
      <div class="top-menu__title">Название компании</div>
      <div class="top-menu__info">
        <span class="top-menu__time">{{ currentDate }}</span>
        <i class="bi bi-clock top-menu__clock"></i>
        <span class="top-menu__time">{{ currentTime }}</span>
        <span class="top-menu__sessions">{{ activeSessions }} активных сессий</span>
      </div>
      
    </div>
  </header>
</template>

<style scoped>
.top-menu {
  /* background-color: #343a40; */
  color: #fff;
  padding: 0.8rem 1.5rem;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
}

.top-menu__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-menu__title {
  color: #28a745;
  font-size: 1.2rem;
  font-weight: 500;
}

.top-menu__info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.top-menu__time {
  color: black;
  font-family: monospace;
  font-size: 0.9rem;
}

.top-menu__clock {
  color: #28a745;
}

.top-menu__sessions {
  font-size: 0.9rem;
  background-color: #28a745;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}
</style>