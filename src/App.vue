<script setup>
import TopMenu from './components/TopMenu.vue';
import NavigationMenu from './components/NavigationMenu.vue';
</script>

<template>
  <div class="app-wrapper">
    <TopMenu />
    <div class="content-wrapper">
      <NavigationMenu />
      <router-view v-slot="{ Component }">
  <transition
    name="fade"
    mode="out-in"
    appear
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <component :is="Component" />
  </transition>
</router-view>
    </div>
  </div>
  
  
  
  
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Шапка */
.content-wrapper {
  display: flex;
  flex: 1;
  /* overflow: hidden; */
}

/* Навигация слева */
nav {
  width: 200px;
  background-color: #343a40;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

nav a:hover {
  color: #0d6efd;
}

/* Контент справа */
.page-content {
  flex: 1;
  padding: 1.5rem;
  background-color: #f8f9fa;
  overflow-y: auto;
}
</style>
