<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const TopMenu = defineAsyncComponent(() =>
import('./components/TopMenu.vue'))
const NaviMenu = defineAsyncComponent(() =>
import('./components/NavigationMenu.vue'))
</script>

<template>
  <div class="app-wrapper">
    <TopMenu />
    <div class="content-wrapper">
      <NaviMenu />
      <router-view v-slot="{ Component }">
        <component :is="Component" />
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
