<script setup>
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
        </ul>
    </div>
</template>