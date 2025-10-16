<template>
  <div>
    <h3>{{ $t('orders') }} Chart</h3>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
canvas {
  max-width: 100%;
  
}
</style>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { useOrdersStore } from '../store/orders'
import { useProductsStore } from '../store/products'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale)

const ordersStore = useOrdersStore()
const productsStore = useProductsStore()

// Собираем суммы по каждому приходу
const chartData = computed(() => {
  const labels = ordersStore.orders.map(order => order.title)
  const data = ordersStore.orders.map(order => {
    const products = productsStore.products.filter(p => p.order === order.id)
    const total = products.reduce((sum, p) => {
      const usd = p.price.find(pr => pr.symbol === 'USD')
      return sum + (usd?.value || 0)
    }, 0)
    return total
  })

  return {
    labels,
    datasets: [
      {
        label: 'USD Total',
        backgroundColor: '#4CAF50',
        data
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: true },
    title: { display: true, text: 'Orders Overview' }
  }
}
</script>