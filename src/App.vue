<script setup>
import TopMenu from './components/TopMenu.vue';
import NavigationMenu from './components/NavigationMenu.vue';
</script>

<template>
  <TopMenu />
  <NavigationMenu />
  <transition 
    name="fade" 
    mode="out-in" 
    appear 
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
    >
  <router-view />
  </transition>
  
</template>

<style scoped>

</style>
