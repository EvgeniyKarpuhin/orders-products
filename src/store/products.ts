import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Product } from "../types";

export const useProductsStore = defineStore('products', () => {
    const products = ref<Product[]>([])

    const currentProductIndex = ref<number>(0)

    const productsByType = (type: string) => computed<Product[]>(() =>
    products.value.filter(p => p.type === type)
    )
    const addProduct = (product: Product): void => {products.value.push(product)}
    const removeProduct = (id: number): void => {
        products.value = products.value.filter(p  => p.id !== id)
    }
    const removeProductFromOrder = (productId: number): void => {
        removeProduct(productId)
        if(currentProductIndex.value >= products.value.length) {
            currentProductIndex.value = 0
        } 
    }
    return { products, productsByType, addProduct, removeProduct, removeProductFromOrder }
})