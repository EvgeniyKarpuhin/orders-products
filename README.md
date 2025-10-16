# 🧾 Orders-Product

Это учебный проект на **Vue 3 (Composition API, Vite, Pinia, Vue Router)**, предназначенный для управления приходами и продуктами.  
В проекте реализованы страницы для отображения заказов и товаров, поддержка мультиязычности (i18n), визуализация данных с помощью **Chart.js** и отображение карт с помощью **Leaflet**.

## 🚀 Возможности

- 📦 **Orders (Приходы)** — добавление, удаление и просмотр приходов.  
- 🧰 **Products (Продукты)** — добавление продуктов с разными статусами («Свободен», «В ремонте») и характеристиками.  
- 🌐 **i18n** — поддержка двух языков: 🇺🇸 English и 🇷🇺 Русский.  
- 🗺️ **Leaflet** — интеграция интерактивных карт.  
- 📊 **Chart.js** — графики для наглядного отображения данных.  
- 💾 **LocalStorage** — сохранение выбранного прихода при обновлении страницы.  
- ⚙️ **Vite** — быстрая сборка и запуск проекта.  

  ## ⚙️ Технологии

- **Vue 3 (Composition API)**
- **TypeScript**
- **Pinia**
- **Vue Router**
- **Vue I18n**
- **Chart.js / vue-chart-3**
- **Leaflet / vue-leaflet**
- **Vite**
- **LocalStorage**

## 📂 Структура проекта
src/
┣ components/
┃ ┣ TopMenu.vue # Верхнее меню
┃ ┣ NavigatorMenu.vue # Боковая навигация
┃ ┣ Orders.Chart.vue # Графики
┃ ┗ Maps.vue # карта
┣ locales/
┃ ┗ index.ts # Vue I18n
┣ pages/
┃ ┣ Orders.vue # компонент с приходами
┃ ┗ Products.vue # компонент с продуктами
┣ router/
┃ ┗ index.ts # Vue Router
┣ store/
┃ ┣ orders.ts # Pinia store для приходов
┃ ┗ products.ts # Pinia store для продуктов
┣ types/
┃ ┗ index.ts # Типы данных в компонентах
┣ utils/
┃ ┗ date.ts # Вспомогательные функции
┣ App.vue # Корневой компонент приложения: структура интерфейса, меню, роутинг и глобальные стили
┗ main.ts # Точка входа в приложение

## 🛠️ Установка и запуск проекта

### 1. Клонировать репозиторий
```bash
git clone https://github.com/EvgeniyKarpuhin/orders-products.git

cd orders-product

npm install

npm run dev

## 👨‍💻 Автор

**Евгений Карпухин**  
Frontend Developer (React.js, Vue.js)  
🔗 [GitHub: EvgeniyKarpuhin](https://github.com/EvgeniyKarpuhin)