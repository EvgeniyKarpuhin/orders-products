<!-- <script setup>
import { useOrdersStore } from '../store/orders';

const ordersStore = useOrdersStore()
</script>

<template>
    <div>
        <h1>Всего заказов: {{ ordersStore.totalOrders }}</h1>
        <ul>
            <li v-for="order in ordersStore.orders" :key="order.id">
                {{ order.title }} {{ order.products.length }} Продукта
                <button @click="ordersStore.removeOrder(order.id)">Удалить</button>
            </li>
            <li v-for="order in ordersStore.ordersWithProducts" :key="order.id">
  <strong>{{ order.title }}</strong> — 
  {{ order.products?.length || 0 }} продукта, 
  сумма: {{ order.totalUSD }} USD / {{ order.totalUAH }} UAH
  <button @click="ordersStore.removeOrder(order.id)">Удалить</button>
</li>
        </ul>
    </div>
</template> -->

<template>
  <div class="orders-page container-fluid">
    <div class="d-flex align-items-center">
          <h3 class="me-3">Заказы</h3>
          <span class="text-muted">/{{ totalOrders }}</span>
        </div>
    <div class="row">
      <!-- Левый столбец -->
      <aside class="col-md-4 orders-list p-3">
        <!-- <div class="d-flex align-items-center">
          <h3 class="me-3">Заказы</h3>
          <span class="text-muted">/{{ totalOrders }}</span>
        </div> -->

        <div v-if="ordersWithProducts.length === 0" class="text-muted">
          Заказаов пока нет
        </div>

        <div class="list-group">
          <button
            v-for="order in ordersWithProducts"
            :key="order.id"
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            :class="{ active: selectedOrder && selectedOrder.id === order.id }"
            @click="selectOrder(order)"
          >
            <div>
              <div class="order-title">{{ order.title }}</div>
              <small class="text-muted">{{ formatDateShort(order.date) }}</small>
            </div>

            <div class="text-end">
              <div class="fw-bold">{{ order.products?.length || 0 }}</div>
              <small class="text-muted">Продукта</small>
              <div class="mt-1 text-nowrap text-secondary small">
                {{ order.totalUSD }} $ • {{ order.totalUAH }} UAH
              </div>
            </div>

            <button class="btn btn-sm ms-2" @click.stop="confirmDelete(order)">
              🗑
            </button>
          </button>
        </div>
      </aside>

      <!-- Правая панель с анимацией -->
      <main class="col-md-8 order-details p-3">
        <transition
          name="slide-fade"
          enter-active-class="animate__animated animate__slideInRight"
          leave-active-class="animate__animated animate__slideOutRight"
          mode="out-in"
        >
          <div v-if="selectedOrder" key="details" class="card">
            <div>
              <div class="d-flex justify-content-between align-items-start m-3">
                <div>
                  <h4 class="card-title">{{ selectedOrder.title }}</h4>
                  <!-- <div class="text-muted small">{{ formatDateLong(selectedOrder.date) }}</div> -->
                </div>
                <!-- <button class="btn btn-light btn-sm" @click="closeDetails">✕</button> -->
              </div>

              <div class="mb-3">
                <button class="btn btn-success btn-sm" @click="addProductToOrder"><spam>+</spam> Добавить продукт</button>
              </div>

              <ul class="list-group rounded-0">
                <li v-for="p in selectedOrder.products" :key="p.id" class="list-group-item d-flex align-items-center">
                  <img v-if="p.photo" :src="p.photo" alt=""
                    style="width:48px;height:48px;object-fit:cover;margin-right:12px;border-radius:4px" />
                  <div class="flex-grow-1 text-start">
                    <div class="fw-semibold">{{ p.title }}</div>
                    <span class="text-muted small">SN: {{ p.serialNumber || '-' }}</span>
                    
                  </div>
                  <div class="text-end me-3">
                    <span class="text-success">{{ p.status }}</span>
                    <!-- <div class="fw-bold">{{ getDefaultPrice(p).value }} {{ getDefaultPrice(p).symbol }}</div>
                    <div class="text-muted small">{{ formatDateShort(p.date) }}</div> -->
                  </div>
                  <button class="btn btn-sm" @click.stop="removeProductFromOrder(p.id)">🗑</button>
                </li>
              </ul>

              <!-- <div class="mt-3 d-flex justify-content-between align-items-center">
                <div class="text-muted small">Сумма заказа</div>
                <div class="fw-bold">{{ selectedOrder.totalUSD }} $ · {{ selectedOrder.totalUAH }} UAH</div>
              </div> -->
            </div>
          </div>

          <!-- Если ничего не выбрано -->
          <div v-else key="placeholder" class="placeholder-block p-5 text-center text-muted animate__animated animate__fadeIn">
            Выберите заказ слева, чтобы увидеть детали
          </div>
        </transition>
      </main>
    </div>

    <!-- Модалка с анимацией -->
    <transition
      enter-active-class="animate__animated animate__zoomIn animate__faster"
      leave-active-class="animate__animated animate__zoomOut animate__faster"
    >
      <div v-if="showDeleteModal" class="modal-overlay">
        <div class="delete-modal card shadow-lg">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
              <h5>Вы уверены, что хотите удалить этот заказ?</h5>
              <button class="btn btn-light btn-sm" @click="closeDeleteModal">✕</button>
            </div>

            <div class="mt-3 d-flex gap-3">
              <img v-if="previewProduct?.photo" :src="previewProduct.photo" alt=""
                style="width:64px;height:64px;object-fit:cover;border-radius:6px" />
              <div>
                <div class="fw-semibold">{{ previewProduct?.title || deletedOrder?.title }}</div>
                <div class="text-muted small">{{ previewProduct?.specification }}</div>
                <div class="text-muted small">SN: {{ previewProduct?.serialNumber || '—' }}</div>
              </div>
            </div>

            <div class="mt-4 d-flex justify-content-end gap-2">
              <button class="btn btn-outline-secondary" @click="closeDeleteModal">Отменить</button>
              <button class="btn btn-danger" @click="deleteOrder">Удалить</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useOrdersStore } from '../store/orders'
import { useProductsStore } from '../store/products'

const ordersStore = useOrdersStore()
const productsStore = useProductsStore()
const { ordersWithProducts, totalOrders } = storeToRefs(ordersStore)

const selectedOrderId = ref(null)
const showDeleteModal = ref(false)
const deletedOrder = ref(null)
const previewProduct = ref(null)

const selectedOrder = computed(() => 
ordersWithProducts.value.find(o => o.id === selectedOrderId.value))

function selectOrder(order) {
  selectedOrderId.value = order.id
}
function closeDetails() {
  selectedOrder.value = null
}
function confirmDelete(order) {
  deletedOrder.value = order
  previewProduct.value = (order.products && order.products.length) ? order.products[0] : null
  showDeleteModal.value = true
}
function closeDeleteModal() {
  showDeleteModal.value = false
  deletedOrder.value = null
  previewProduct.value = null
}
function deleteOrder() {
  if (!deletedOrder.value) return
  ordersStore.removeOrder(deletedOrder.value.id)
  closeDeleteModal()
  if (selectedOrder.value && selectedOrder.value.id === deletedOrder.value.id) {
    selectedOrder.value = null
  }
}
function addProductToOrder() {
  if(!selectedOrder.value) return;
  const newProduct = {
    id: Date.now(),
    title: 'Новый продукт',
    photo: 'pathToFile.jpg',
    serialNumber: 1234,
    specification: 'Specification 1',
    status: 'Свободен',
    price: [
      {value: Math.floor(Math.random() * 100), symbol: 'USD', isDefault: true},
      {value: Math.floor(Math.random() * 3000), symbol: 'UAH', isDefault: false},
    ],
    order: selectedOrder.value.id,
    date: new Date().toISOString()
  }
  // ordersStore.addProductToOrder(selectedOrder.value.id, newProduct)
  productsStore.addProduct(newProduct)
}
function removeProductFromOrder(productId) {
  productsStore.removeProduct(productId)
}
function getDefaultPrice(p) {
  if (!p?.price) return { value: 0, symbol: '' }
  const def = p.price.find(pr => pr.isDefault) || p.price[0]
  return def || { value: 0, symbol: '' }
}
function formatDateShort(d) {
  try {
    return new Date(d).toLocaleDateString()
  } catch { return d }
}
function formatDateLong(d) {
  try {
    return new Date(d).toLocaleString()
  } catch { return d }
}
</script>

<style scoped>
.orders-page { padding: 20px 8px; }
.orders-list .list-group-item { cursor: pointer; display: flex; gap: 12px; align-items: center; }
.order-title { font-weight: 600; }
.order-details .placeholder-block { background:#f8f9fb; border-radius:8px; padding:40px; }

.modal-overlay {
  position:fixed; inset:0; display:flex; align-items:center; justify-content:center;
  background:rgba(0,0,0,0.45); z-index:3000;
}
.delete-modal { width:720px; border-radius:8px; overflow:hidden; }
</style>