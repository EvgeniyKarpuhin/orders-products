<template>
  <div class="orders-page container-fluid">
    <div class="d-flex align-items-center py-5">
      <button class="btn me-3 rounded-5 border border-4 border-success d-flex justify-content-center align-items-center text-white" style="background: #0fb304; width: 35px; height: 35px;" @click="addNewOrder">+</button>
      <h3 class="me-2">Приходы</h3>
      <h3><span class="me-2">/</span>{{ totalOrders }}</h3>
    </div>
    <div class="position-relative" style="height: 80vh;">
      <!-- Левый столбец -->
      <aside class="list-group transition-width"
        :class="{ 'col-md-4': selectedOrder, 'col-12': !selectedOrder }">

        <div v-if="ordersWithProducts.length === 0" class="text-muted">
          Приходов нет
        </div>

        <div class="list-group">
          <div
            role="button"
            v-for="order in ordersWithProducts"
            :key="order.id"
            class="d-flex justify-content-between align-items-stretch mb-3 border rounded btnHov"
            
            @click="selectOrder(order)"
          >
          <div class="flex-grow-1 d-flex justify-content-between align-items-center m-3">
            <transition name="fade" mode="out-in">
              <div v-show="!selectedOrder">
                <u>{{ order.title }}</u>
              </div>
              
            </transition>
            

            <div class="text-start d-flex align-items-center">
              <div>
                <i class="bi bi-list-ul me-3 text-secondary" style="font-size: x-large;border: 1px solid;border-radius: 50%;width: 40px;display: flex;height: 40px;justify-content: center;align-items: center;"></i>
              </div>
              <div>
                <div class="fw-bold fs-5">{{ order.products?.length || 0 }}</div>
              <small class="text-muted">{{ order.products?.length ? productEndWord(order.products?.length) : 'Нет продуктов' }}</small>
              </div>
            </div>

            <div>
              <small class="text-muted">{{ formatDateShort(order.date) }}</small>
            </div>

            <div v-if="!selectedOrder" class="text-nowrap text-secondary d-grid text-start">
              <small class="fs-small">{{ order.totalUSD }} $</small>
              <span>{{ order.totalUAH }} UAH</span>
            </div>

            <button v-if="!selectedOrder" class="btn btn-sm ms-2" @click.stop="confirmDelete(order)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
          <div v-if="selectedOrder?.id === order.id" class="arrow-wrapper d-flex align-items-center justify-content-center">
            <i class="bi bi-chevron-right text-secondary fs-4"></i>
          </div>
          
          </div>
          
        </div>
      </aside>

      <!-- Правая панель с анимацией -->
       <transition name="slide-right">
        <main v-if="selectedOrder" 
              :key="selectedOrder.id"
              class="order-details position-absolute top-0 end-0 h-100 bg-white px-3">
          <div v-if="selectedOrder" key="details" class="card mh-80" style="max-height: 80vh;">
            <div class="overflow-x-hidden">
              <div class="p-2">
                <div class="d-flex justify-content-between align-items-start m-3">
                <div>
                  <h4 class="card-title">{{ selectedOrder.title }}</h4>
                </div>
                <button class="btn btn-light btn-sm btn-close-custom" @click="closeDetails">✕</button>
              </div>

              <div class="mb-3 text-start">
                <button class="btn btn-sm m-l-3 d-flex text-success" @click="addProductToOrderNext()"><span class="rounded-5 bg-success me-2" style="color: white; width: 20px;">+</span> Добавить продукт</button>
              </div>
              </div>
              

              <ul class="list-group rounded-0">
                <li v-for="p in selectedOrder.products" :key="p.id" class="d-flex align-items-center gap-3 border-top border-bottom btnHov p-4">
                  <i class="bi bi-circle-fill text-warning" style="font-size: 10px; margin-right: 10px;"></i>
                  <img v-if="p.photo" :src="p.photo" alt="Монитор"
                    style="width:48px;height:48px;object-fit:cover;margin-right:12px;border-radius:4px" />
                  <div class="flex-grow-1 text-start">
                    <div class="fw-semibold">{{ p.title }}</div>
                    <span class="text-muted small">SN: {{ p.serialNumber || '-' }}</span>
                    
                  </div>
                  <div class="text-end me-3">
                    <span class="text-warning">{{ p.status }}</span>
                  </div>
                  <button class="btn btn-sm" @click.stop="removeProductFromOrder(p.id)">
                    <i class="bi bi-trash"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- Если ничего не выбрано -->
          <div v-else key="placeholder" class="placeholder-block p-5 text-center text-muted animate__animated animate__fadeIn">
            Выберите заказ слева, чтобы увидеть детали
          </div>
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

<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useOrdersStore } from '../store/orders'
import { useProductsStore } from '../store/products'
import { formatDateShort } from '../utils/date'
import type { Order, Product } from '../types'

const ordersStore = useOrdersStore()
const productsStore = useProductsStore()
const { ordersWithProducts, totalOrders } = storeToRefs(ordersStore)

const selectedOrderId = ref<number | null>(null)
const showDeleteModal = ref<boolean>(false)
const deletedOrder = ref<Order | null>(null)
const previewProduct = ref<Product | null>(null)
const currentProductIndex = ref<number>(0)

const selectedOrder = computed<Order | undefined>(() => 
ordersWithProducts.value.find(o => o.id === selectedOrderId.value))

function addNewOrder(): void {
  const newOrder: Order = {
    id: Date.now(),
    title: 'Рандомное название прихода',
    date: new Date().toISOString(),
    description: 'Новый приход'
  }
  ordersStore.addOrder(newOrder)
}

function selectOrder(order: Order): void {
  selectedOrderId.value = order.id
}
function closeDetails(): void {
  selectedOrderId.value = null
}
function confirmDelete(order: Order): void {
  deletedOrder.value = order
  previewProduct.value = (order.products && order.products.length) ? order.products[0] : null
  showDeleteModal.value = true
}
function closeDeleteModal(): void {
  showDeleteModal.value = false
  deletedOrder.value = null
  previewProduct.value = null
}
function deleteOrder(): void {
  if (!deletedOrder.value) return
  const wasSelected = selectedOrder.value?.id === deletedOrder.value.id
  if (wasSelected) {
    const remainingOrders = ordersStore.orders.filter((o: Order) => o.id !== deletedOrder.value!.id)
    selectedOrderId.value = remainingOrders.length > 0 ? remainingOrders[0].id : null
  }

  ordersStore.removeOrder(deletedOrder.value!.id)
  closeDeleteModal()

  if (selectedOrder.value && selectedOrder.value.id === deletedOrder.value!.id) {
    selectedOrderId.value = null
  }
}

function addProductToOrder(productId: number): void {
  if(!selectedOrder.value) return;

  const product = productsStore.products.find(p => p.id === productId)
  if(!product) return;

  const newProduct: Product = {
    ...product,
    id: Date.now(),
    order: selectedOrder.value.id,
    date: new Date().toISOString()
  }
  productsStore.addProduct(newProduct)
}

function addProductToOrderNext(): void {
  const newProduct = productsStore.products[currentProductIndex.value]
  if(newProduct) {
    addProductToOrder(newProduct.id)
    currentProductIndex.value = (currentProductIndex.value + 1) % productsStore.products.length
  }
}

function removeProductFromOrder(productId: number): void {
  productsStore.removeProduct(productId)
  if(currentProductIndex.value >= productsStore.products.length) {
    currentProductIndex.value = 0
  }
}

function productEndWord(count: number): string {
  const last10 = count % 10
  const last100 = count % 100

  if(last10 === 1 && last100 !== 11) return 'Продукт'
  if(last10 >=2 && last10 <=4 && (last100 < 10 || last100 >= 20)) return 'Продукта'
  return 'Продуктов'
}
</script>

<style scoped>
.orders-page { padding: 0 3rem; }
.orders-list { max-height: 80vh; overflow-y: auto; overflow-x: hidden; }
.btnHov:hover { box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5); z-index: 1 }
.orders-list .list-group-item { cursor: pointer; display: flex; gap: 12px; align-items: center; }
.order-title { font-weight: 600; }
.order-details {
  width: 66.666%;
  z-index: 10;
  transition: transform 0.7s ease, opacity 0.4s ease;
}
.order-details .placeholder-block { background:#f8f9fb; border-radius:8px; padding:40px; }

.modal-overlay {
  position:fixed; inset:0; display:flex; align-items:center; justify-content:center;
  background:rgba(0,0,0,0.45); z-index:3000;
}
.delete-modal { width:720px; border-radius:8px; overflow:hidden; }

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease;
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
  transition: width 0.5s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
  display: none;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  transform: translateX(100px);
  opacity: 1;
}

.btn-close-custom {
  position: absolute;
  top: -20px;
  right: -20px;
  background-color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: gray;
}

.arrow-wrapper {
  background-color: #f0f0f0;
  padding: 0 12px;
  transition: background-color 0.2s ease;
}
</style>