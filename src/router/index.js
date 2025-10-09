import { createRouter, createWebHistory } from "vue-router";
import Orders from "../pages/Orders.vue";
import Products from "../pages/Products.vue";

const routes = [
    { path: '/', redirect: '/orders' },
    { path: '/orders', component: Orders },
    { path: '/products', component: Products },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router