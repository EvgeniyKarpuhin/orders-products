<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProductsStore } from '../store/products' 
import { useOrdersStore } from '../store/orders' 
import { formatDateShort } from '../utils/date'
import type { Order, Product } from '../types'
import Maps from '../components/Maps.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const { products } = useProductsStore()
const { orders } = useOrdersStore()

const totalProducts = computed<number>(() => products.length)

const selectedType = ref<string>('all')
const selectedSpecification = ref<string>('all')

const normalizeType = (type: string): string => {
  const map: Record<string, string> = {
    'Монитор': 'monitor'
  }
  return map[type] || type.toLowerCase()
}

const normalizeSpec = (spec: string): string => {
  const map: Record<string, string> = {
    'Новый': 'new',
    'Б/У': 'used'
  }
  return map[spec] || spec.toLowerCase()
}

const productTypes = computed<string[]>(() => {
  const types = products.map(p => normalizeType(p.type))
  return ['all', ...new Set(types)]
})

const productSpecification = computed<string[]>(() => {
  const spec = products.map(p => normalizeSpec(p.specification))
  return ['all', ...new Set(spec)]
})

const filteredProducts = computed<Product[]>(() => {
  let result = products.filter(p => p.order)
  if (selectedType.value !== 'all') {
    result = result.filter(p => normalizeType(p.type) === selectedType.value)
  }
  if (selectedSpecification.value !== 'all') {
    result = result.filter(p => normalizeSpec(p.specification) === selectedSpecification.value)
  }
  return result
})

function formatDate(dateStr: string, format: 'short' | 'full' = 'short'): string {
  const date = new Date(dateStr)
  if (format === 'short') {
    return date.toLocaleDateString('ru-RU')
  } else {
    return date.toLocaleString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    })
  }
}

function getOrderTitle(orderId: number): string {
  const order: Order | undefined = orders.find(o => o.id === orderId)
  return order ? t('orderName') : t('untitled')
}

function getPrice(product: Product, currency: 'USD' | 'UAH'): number {
  const price = product.price.find(p => p.symbol === currency)
  return price?.value || 0
}
</script>

<template>
  <div class="w-100 ps-5 pt-4">
    <header class="d-flex align-items-center py-4">
      <div class="d-flex me-5">
        <h3 class="me-2">{{ $t('orders') }}</h3>
        <h3><span class="me-2">/</span>{{ totalProducts }}</h3>
      </div>
      
      <div class="d-flex align-items-baseline me-5">
        <p class="me-2">{{ $t('types') }}:</p>
        <select v-model="selectedType" class="form-select w-auto">
          <option v-for="type in productTypes" :key="type" :value="type">{{ $t(`filters.types.${type}`) }}</option>
        </select>
      </div>

      <div class="d-flex align-items-baseline">
        <p class="me-2">{{ $t('specification') }}:</p>
        <select v-model="selectedSpecification" class="form-select">
          <option v-for="spec in productSpecification" :key="spec" :value="spec">{{ $t(`filters.specification.${spec}`) }}</option>
        </select>
      </div>
    </header>

    <div class="list-group w-100 overflow-auto" style="max-height: 80vh;">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="list-group-item d-flex align-items-center mb-3 border rounded gap-2 justify-content-between"
      >
          <i class="bi bi-circle-fill text-warning" style="font-size: 10px; margin-right: 10px;"
            :class="{
              'text-warning': product.status === 'Свободен',
              'text-muted fw-bold': product.status === 'В ремонте'
            }"></i>
          <img :src="product.photo" alt="product" class="me-3" style="width: 60px; height: 60px; object-fit: contain;" />
          <div class="text-start">
            <div style="max-width: 300px;">{{ product.title }}</div>
          <span class="text-muted small">SN: {{ product.serialNumber || '-' }}</span>
          </div>
          
          <div class="text-start me-4">
            <span :class="{
              'text-warning': product.status === 'Свободен',
              'text-muted fw-bold': product.status === 'В ремонте'}">{{ $t(`status.${product.status}`) }}</span>
          </div>

          <div class="d-grid">
            <span>{{ $t('guarantee.from') }} {{ formatDate(product.guarantee.start) }}</span> 
            <span>{{ $t('guarantee.to') }} {{ formatDate(product.guarantee.end) }}</span>
          </div>

          <div class="text-end me-3">
            <span>{{ $t(`filters.specification.${normalizeSpec(product.specification)}`) }}</span>
          </div>

          <div>
            <div class="text-nowrap text-secondary d-grid text-start">
              <small class="fs-small">{{ getPrice(product, 'USD') }} $</small>
              <span>{{ getPrice(product, 'UAH') }} UAH</span>
            </div>
          </div>
          <span>{{ product.order ? getOrderTitle(product.order) : 'Без названия' }}</span>

          <div>
            <small class="text-muted">{{ formatDateShort(product.date) }}</small>
          </div>
      </div>
    </div>
    <Maps />
  </div>
</template>



