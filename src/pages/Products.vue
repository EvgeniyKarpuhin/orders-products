<template>
  <div class="orders-wrapper position-relative overflow-hidden" style="width: 100%;">
    <!-- Левая колонка -->
    <aside
      class="orders-list p-3 transition-width bg-white"
      :class="{ 'col-md-4': selectedOrder, 'col-12': !selectedOrder }"
    >
      <div v-if="orders.length === 0" class="text-muted">Приходов нет</div>

      <div class="list-group">
        <button
          v-for="order in orders"
          :key="order.id"
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-3 border rounded"
          :class="{ active: selectedOrder && selectedOrder.id === order.id }"
          @click="selectOrder(order)"
        >
        <transition name="fade" mode="out-in">
          <u v-show="!selectedOrder" class="fw-bold">{{ order.title }}</u>
        </transition>
          

          <div>
            <p>ghfghgffgjhhfjhf</p>
          </div>

          <div v-show="!selectedOrder">
            <p>ghfghgffgjhhfjhf</p>
          </div>

          <div class="text-start d-flex align-items-center">
            <i
              class="bi bi-list-ul me-3 text-secondary"
              style="font-size: x-large; border: 1px solid; border-radius: 50%; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center;"
            ></i>
            <div>
              <div class="fw-bold fs-5">{{ order.products?.length || 0 }}</div>
              <small class="text-muted">{{ productEndWord(order.products?.length) }}</small>
            </div>
          </div>
        </button>
      </div>
    </aside>

    <!-- Правая панель (поверх, а не в потоке) -->
    <transition name="slide-right">
      <main
        v-if="selectedOrder"
        class="order-details position-absolute top-0 end-0 h-100 bg-white shadow-lg p-3"
      >
        <div class="d-flex justify-content-between align-items-start m-3">
          <div>
            <h4 class="card-title">{{ selectedOrder.title }}</h4>
          </div>
          <button class="btn btn-light btn-sm" @click="closeDetails">✕</button>
        </div>

        <ul class="list-group rounded-0">
          <li
            v-for="p in selectedOrder.products"
            :key="p.id"
            class="list-group-item d-flex align-items-center"
          >
            <img
              v-if="p.photo"
              :src="p.photo"
              alt="Фото"
              style="width:48px;height:48px;object-fit:cover;margin-right:12px;border-radius:4px"
            />
            <div class="flex-grow-1 text-start">
              <div class="fw-semibold">{{ p.title }}</div>
              <span class="text-muted small">SN: {{ p.serialNumber || '-' }}</span>
            </div>
          </li>
        </ul>
    </main>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const orders = ref([
  {
    id: 1,
    title: 'Очень длинное название прихода',
    products: [
      { id: 1, title: 'Монитор', serialNumber: 'SN123', photo: '/images/samsung.png' },
      { id: 2, title: 'Клавиатура', serialNumber: 'SN456', photo: '/images/samsung.png' },
    ],
  },
  {
    id: 2,
    title: 'Ещё одно длинющее название прихода',
    products: [
      { id: 3, title: 'Мышка', serialNumber: 'SN789', photo: '/images/samsung.png' },
    ],
  },
])

const selectedOrder = ref(null)

function selectOrder(order) {
  selectedOrder.value = order
}

function closeDetails() {
  // setTimeout(() => {
    selectedOrder.value = null
  // }, 400)
  
}

function productEndWord(count) {
  if (count === 1) return 'Продукт'
  if (count >= 2 && count <= 4) return 'Продукта'
  return 'Продуктов'
}
</script>

<style scoped>
.orders-wrapper {
  position: relative;
  display: flex;
  transition: all 0.4s ease;
  min-height: 100vh;
}

.transition-width {
  transition: width 0.4s ease;
}

.order-details {
  width: 66.666%; /* ширина как col-md-8 */
  z-index: 10;
}

/* Анимация выезда справа */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.7s ease;
}

.slide-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-right-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-right-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.fade-enter-active, 
.fade-leave-active {
  transition: opacity 0.3s ease;
  display: none;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>


