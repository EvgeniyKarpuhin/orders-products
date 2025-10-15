<template>
    <nav class="navigation animate__animated animate__fadeInLeft">
        <router-link to="/orders" class="nav-link">Приход</router-link>
        <router-link to="/products" class="nav-link">Продукты</router-link>
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