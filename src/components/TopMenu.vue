<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref('')

function updateTime() {
    const now = new Date()
    currentTime.value = now.toLocaleString()
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
      <div class="top-menu__title">Панель управления</div>
      <div class="top-menu__time">{{ currentTime }}</div>
    </div>
  </header>
</template>

<style scoped>
.top-menu {
  background-color: #343a40;
  color: #fff;
  padding: 0.8rem 1.5rem;
  border-bottom: 3px solid #007bff;
}

.top-menu__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-menu__title {
  font-size: 1.2rem;
  font-weight: 500;
}

.top-menu__time {
  font-family: monospace;
  font-size: 0.9rem;
}
</style>