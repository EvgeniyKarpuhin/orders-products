import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useProductsStore } from "./products";

export const useOrdersStore = defineStore('orders', () => {
    const productsStore = useProductsStore();
    const orders = ref([
        {
            id: 1,
            title: 'Рандомное название прихода',
            date: '2017-12-29 12:09:33',
            description: 'desc',
            // get products () { return products }
        },
        {
            id: 2,
            title: 'Рандомное название прихода',
            date: '2017-06-29 12:09:33',
            description: 'desc',
            // get products () { return products }
        },
        {
            id: 3,
            title: 'Рандомное название прихода',
            date: '2017-06-29 12:09:33',
            description: 'desc',
            // get products () { return products },
        }
    ]);

    const ordersWithProducts = computed(() => {
    return orders.value.map(order => {
      const relatedProducts = productsStore.products.filter(
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

  const totalOrders = computed(() => orders.value.length);

  const addOrder = (order) => orders.value.push(order);
  const removeOrder = (id) => {
    orders.value = orders.value.filter(o => o.id !== id);
    productsStore.products = productsStore.products.filter(p => p.order !==id);
  };

  return { orders, ordersWithProducts, totalOrders, addOrder, removeOrder };

    // const totalOrders = computed(() => orders.value.length)

    // const addOrder = (order) => orders.value.push(order)
    // const removeOrder = (id) => {
    //     orders.value = orders.value.filter(o => o.id !== id)
    // }

    // return { orders, totalOrders, addOrder, removeOrder }
})