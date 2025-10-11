<template>
    <nav class="navigation animate__animated animate__fadeInLeft">
        <router-link to="/orders" class="nav-link">Заказы</router-link>
        <router-link to="/products" class="nav-link">Продукты</router-link>
    </nav>
</template>

<style scoped>
.navigation {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
}

.nav-link {
    position: relative;
  text-decoration: none;
  color: #333;
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
  width: 40%;
  height: 3px;
  background-color: #57dd4e;
  border-radius: 2px;
}
</style>