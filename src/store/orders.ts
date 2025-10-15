import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useProductsStore } from "./products";
import type { Order, Product } from "../types";

export const useOrdersStore = defineStore('orders', () => {
    const productsStore = useProductsStore();
    const orders = ref<Order[]>([]);

    const ordersWithProducts = computed<Order[]>(() => {
    return orders.value.map(order => {
      const relatedProducts: Product[] = productsStore.products.filter(
        p => p.order === order.id
      );

      const totalUSD = relatedProducts.reduce((sum, p) => {
        const prices = Array.isArray(p.price) ? p.price : []
        const usd = prices.find(pr => pr.symbol === 'USD');
        return sum + (usd?.value || 0);
      }, 0);

      const totalUAH = relatedProducts.reduce((sum, p) => {
        const prices = Array.isArray(p.price) ? p.price : []
        const uah = prices.find(pr => pr.symbol === 'UAH');
        return sum + (uah?.value || 0);
      }, 0);

      return {
        ...order,
        products: relatedProducts,
        totalUSD,
        totalUAH
      };
    });
  });

  const totalOrders = computed<number>(() => orders.value.length);

  const addOrder = (order: Order) => orders.value.push(order);
  const removeOrder = (id: number) => {
    orders.value = orders.value.filter(o => o.id !== id);
    productsStore.products = productsStore.products.filter(p => p.order !==id);
  };
  return { orders, ordersWithProducts, totalOrders, addOrder, removeOrder };
})