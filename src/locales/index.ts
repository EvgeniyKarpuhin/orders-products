import { createI18n } from "vue-i18n";

const messages = {
  en: {
    orders: 'Orders',
    products: 'Products',
    users: 'Users',
    total: 'Total',
    addProduct: 'Add Product',
    delete: 'Delete',
  },
  ru: {
    orders: 'Приход',
    products: 'Продукты',
    users: 'Пользователи',
    total: 'Всего',
    addProduct: 'Добавить продукт',
    delete: 'Удалить',
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'ru',
  fallbackLocale: 'en',
  messages
})