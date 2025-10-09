import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useOrdersStore = defineStore('orders', () => {
    const orders = ref([
        {
            id: 1,
            title: 'Order 1',
            date: '2017-06-29 12:09:33',
            description: 'desc',
            get products () { return products }
        },
        {
            id: 2,
            title: 'Order 2',
            date: '2017-06-29 12:09:33',
            description: 'desc',
            get products () { return products }
        },
        {
            id: 3,
            title: 'Order 3',
            date: '2017-06-29 12:09:33',
            description: 'desc',
            get products () { return products },
        }
    ])

    const totalOrders = computed(() => orders.value.length)

    const addOrder = (order) => orders.value.push(order)
    const removeOrder = (id) => {
        orders.value = orders.value.filter(o => o.id !== id)
    }

    return { orders, totalOrders, addOrder, removeOrder }
})