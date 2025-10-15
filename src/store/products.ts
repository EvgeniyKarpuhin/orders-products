import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Product } from "../types";

export const useProductsStore = defineStore('products', () => {
    const products = ref<Product[]>([
        {
            id: 1,
            serialNumber: 1234,
            isNew: 1,
            photo: '/images/samsung.png',
            title: 'Монитор 27" Samsung S27DG600SI (LS27DG600SIXCI)',
            type: 'Monitors',
            specification: 'Новый',
            status: 'Свободен',
            guarantee: {
            start: '2017-06-29 12:09:33',
            end: '2017-07-30 12:09:33'
            },
            price: [
            {value: 100, symbol: 'USD', isDefault: true},
            {value: 4100, symbol: 'UAH', isDefault: false}
            ],
            order: 1,
            date: '2017-06-29 12:09:33'
        },
        {
            id: 2,
            serialNumber: 1234,
            isNew: 1,
            photo: '/images/samsung.png',
            title: 'Монитор 27" Samsung S27DG600SI (LS27DG600SIXCI)',
            type: 'Monitors',
            specification: 'Б/У',
            status: 'В ремонте',
            guarantee: {
            start: '2017-12-29 12:09:33',
            end: '2018-01-18 12:09:33'
            },
            price: [
            {value: 100, symbol: 'USD', isDefault: true},
            {value: 4100, symbol: 'UAH', isDefault: false}
            ],
            order: 2,
            date: '2017-06-29 12:09:33'
        }
    ])

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