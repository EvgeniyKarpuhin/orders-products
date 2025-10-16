<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { io, Socket } from 'socket.io-client'

const socket: Socket = io('http://localhost:3000', { transports: ['websocket'] })

const activeSessions = ref<number>(0)
const currentDate = ref<string>('')
const currentTime = ref<string>('')

function updateTime(): void {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }
    let formatDate = now.toLocaleString('ru-RU', options)
    formatDate = formatDate
    .replace(/\s?г\./, '')
    .replace(/\./g, '')
    .trim()
    currentDate.value = formatDate
    currentTime.value = now.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    })
}

let interval: ReturnType<typeof setInterval>
onMounted(() => {
    updateTime()
    interval = setInterval(updateTime, 1000)

    socket.on('activeSessions', (count: number) => {
      activeSessions.value = count
    })
    socket.emit('join')
})

onUnmounted(() => {
  clearInterval(interval)
  socket.disconnect()
})

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
  color: #fff;
  padding: 0.8rem 1.5rem;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
  z-index: 1;
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