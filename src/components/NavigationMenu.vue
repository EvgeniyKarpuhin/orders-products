<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n()
function setLang(lang: string) {
  locale.value = lang
  localStorage.setItem('lang', lang)
}
</script>

<template>
    <nav class="navigation animate__animated animate__fadeInLeft">
      <div class="navigation-lang">
        <button @click="setLang('ru')">ru</button>
        <button @click="setLang('en')">en</button>
      </div>
      <router-link to="/orders" class="nav-link">{{ t('orders') }}</router-link>
      <router-link to="/products" class="nav-link">{{ t('products') }}</router-link>
    </nav>
</template>

<style scoped>
.navigation {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
  border: 1px solid #ddd;
}

.navigation-lang button {
  background: none;
}

.navigation-lang button:hover {
  border-color: white;
}

.nav-link {
    position: relative;
  text-decoration: none;
  transition: color 0.3s;
}

.router-link-active {
  font-weight: bold;
}

.router-link-active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 3px;
  background-color: #57dd4e;
  border-radius: 2px;
}
</style>