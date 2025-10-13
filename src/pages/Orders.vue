<template>
  <div class="orders-page container-fluid">
    <div class="d-flex align-items-center py-5">
      <button class="btn me-3 rounded-5 border border-4 border-success d-flex justify-content-center align-items-center text-white" style="background: #0fb304; width: 35px; height: 35px;" @click="addNewOrder">+</button>
      <h3 class="me-3">Приходы</h3>
      <span class="text-muted">/{{ totalOrders }}</span>
    </div>
    <div class="position-relative overflow-hidden" style="height: 80vh;">
      <!-- Левый столбец -->
      <aside class="orders-list transition-width"
        :class="{ 'col-md-4': selectedOrder, 'col-12': !selectedOrder }">

        <div v-if="ordersWithProducts.length === 0" class="text-muted">
          Приходов нет
        </div>

        <div class="list-group">
          <button
            v-for="order in ordersWithProducts"
            :key="order.id"
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-3 border rounded"
            :class="{
              active: selectedOrder && selectedOrder.id === order.id
            }"
            @click="selectOrder(order)"
          >
            <div v-if="!selectedOrder && !isClosing">
              <u class="fw-bold">{{ order.title }}</u>
            </div>

            <div class="text-start d-flex align-items-center">
              <div>
                <i class="bi bi-list-ul me-3 text-secondary" style="font-size: x-large;border: 1px solid;border-radius: 50%;width: 40px;display: flex;height: 40px;justify-content: center;align-items: center;"></i>
              </div>
              <div>
                <div class="fw-bold fs-5">{{ order.products?.length || 0 }}</div>
              <small class="text-muted">{{ productEndWord(order.products?.length) || 0 }}</small>
              </div>
              
            </div>

            <div>
              <small class="text-muted">{{ formatDateShort(order.date) }}</small>
            </div>

            <div v-if="!selectedOrder && !isClosing" class="text-nowrap text-secondary d-grid text-start">
              <small class="fs-small">{{ order.totalUSD }} $</small>
              <span>{{ order.totalUAH }} UAH</span>
                 
              </div>

            <button v-if="!selectedOrder && !isClosing" class="btn btn-sm ms-2" @click.stop="confirmDelete(order)">
              <i class="bi bi-trash"></i>
            </button>
          </button>
        </div>
      </aside>

      <!-- Правая панель с анимацией -->
       <transition name="slide-right">
        <main v-if="selectedOrder" 
              :key="selectedOrder.id"
              class="order-details position-absolute top-0 end-0 h-100 bg-white px-3">
          <div v-if="selectedOrder" key="details" class="card mh-80 overflow-y-auto" style="max-height: 80vh;">
            <div>
              <div class="p-2">
                <div class="d-flex justify-content-between align-items-start m-3">
                <div>
                  <h4 class="card-title">{{ selectedOrder.title }}</h4>
                </div>
                <button class="btn btn-light btn-sm" @click="closeDetails">✕</button>
              </div>

              <div class="mb-3 text-start">
                <button class="btn btn-sm m-l-3 d-flex text-success" @click="addProductToOrder"><span class="rounded-5 bg-success me-2" style="color: white; width: 20px;">+</span> Добавить продукт</button>
              </div>
              </div>
              

              <ul class="list-group rounded-0">
                <li v-for="p in selectedOrder.products" :key="p.id" class="list-group-item d-flex align-items-center">
                  <img v-if="p.photo" :src="p.photo" alt="Монитор"
                    style="width:48px;height:48px;object-fit:cover;margin-right:12px;border-radius:4px" />
                  <div class="flex-grow-1 text-start">
                    <div class="fw-semibold">{{ p.title }}</div>
                    <span class="text-muted small">SN: {{ p.serialNumber || '-' }}</span>
                    
                  </div>
                  <div class="text-end me-3">
                    <span class="text-success">{{ p.status }}</span>
                  </div>
                  <button class="btn btn-sm" @click.stop="removeProductFromOrder(p.id)">
                    <i class="bi bi-trash"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- Если ничего не выбрано -->
          <!-- <div v-else key="placeholder" class="placeholder-block p-5 text-center text-muted animate__animated animate__fadeIn">
            Выберите заказ слева, чтобы увидеть детали
          </div> -->
      </main>
       </transition>
      
    </div>

    <!-- Модалка с анимацией -->
    <transition
      enter-active-class="animate__animated animate__zoomIn animate__faster"
      leave-active-class="animate__animated animate__zoomOut animate__faster"
    >
      <div v-if="showDeleteModal" class="modal-overlay">
        <div class="delete-modal card shadow-lg border-0">
          <div>
            <div class="d-flex justify-content-between align-items-start p-4">
              <h5>Вы уверены, что хотите удалить этот приход?</h5>
              <button class="btn btn-light btn-sm" @click="closeDeleteModal">✕</button>
            </div>

            <div class="d-flex gap-3 p-4 border-top">
              <img v-if="previewProduct?.photo" :src="previewProduct.photo" alt=""
                style="width:64px;height:64px;object-fit:cover;border-radius:6px" />
              <div class="text-start ">
                <div class="fw-semibold">{{ previewProduct?.title || deletedOrder?.title }}</div>
                <div class="text-muted small">SN: {{ previewProduct?.serialNumber || '—' }}</div>
              </div>
            </div>

            <div class="d-flex justify-content-end gap-2 p-4" style="background: #0fb304;">
              <button class="bg-transparent text-white" @click="closeDeleteModal">Отменить</button>
              <button class="btn text-danger bg-light px-4 rounded-5" @click="deleteOrder"><i class="bi bi-trash me-2"></i>Удалить</button>
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

function addNewOrder() {
  const newOrder = {
    id: Date.now(),
    title: 'Рандомное название прихода',
    date: new Date().toISOString(),
    description: 'Новый приход'
  }
  ordersStore.addOrder(newOrder)
}

function selectOrder(order) {
  selectedOrderId.value = order.id
}
function closeDetails() {
  selectedOrderId.value = null
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
    title: 'Монитор 27" Samsung S27DG600SI (LS27DG600SIXCI)',
    photo: '/images/samsung.png',
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
function productEndWord(count) {
  const last10 = count % 10
  const last100 = count % 100

  if(last10 === 1 && last100 !== 11) return 'Продукт'
  if(last10 >=2 && last10 <=4 && (last100 < 10 || last100 >= 20)) return 'Продукта'
  return 'Продуктов'
}
function formatDateShort(d) {
  try {
    const date = new Date(d)
    const day = date.toLocaleString('ru-RU', { day: '2-digit'})
    let month = date.toLocaleString('ru-RU', { month: 'short'})
    month = month.replace('.', '')
    month = month.charAt(0).toUpperCase() + month.slice(1)
    const year = date.getFullYear()
    return `${day} / ${month} / ${year}`
  } catch { 
    return d 
  }
}
function formatDateLong(d) {
  try {
    return new Date(d).toLocaleString()
  } catch { return d }
}
</script>

<style scoped>
.orders-page { padding: 0 3rem; }
.orders-list { max-height: 80vh; overflow-y: auto; overflow-x: hidden; }
.orders-list .list-group-item { cursor: pointer; display: flex; gap: 12px; align-items: center; }
.order-title { font-weight: 600; }
.order-details {
  width: 66.666%; /* ширина как col-md-8 */
  z-index: 10;
  transition: transform 0.7s ease, opacity 0.4s ease;
  /* width: 66.666%; */
}
.order-details .placeholder-block { background:#f8f9fb; border-radius:8px; padding:40px; }

.modal-overlay {
  position:fixed; inset:0; display:flex; align-items:center; justify-content:center;
  background:rgba(0,0,0,0.45); z-index:3000;
}
.delete-modal { width:720px; border-radius:8px; overflow:hidden; }

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

.transition-width {
  transition: width 0.7s ease;
}

/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
} */
</style>