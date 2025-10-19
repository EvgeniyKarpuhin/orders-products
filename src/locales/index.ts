import { createI18n } from "vue-i18n";

const messages = {
  en: {
    orders: 'Orders',
    noOrders: 'No orders',
    orderName: 'Randon order name',
    products: 'Products',
    productWord: {
      none: "No products",
      one: "Product",
      few: "Products",
      many: "Products"
    },
    status: {
      avail: 'Available',
      repair: 'Under repair'
    },
    types: 'Type',
    specification: 'Specification',
    filters: {
      types: {
        monitors: 'Monitor',
        all: 'All'
      },
      specification: {
        new: 'New',
        used: 'Used',
        all: 'All'
    }
    },
    guarantee: {
      from: 'from',
      to: 'to'
    },
    total: 'Total',
    untitled: 'Untitled',
    addProduct: 'Add Product',
    cancel: 'Cancel',
    delete: 'Delete',
  },
  ru: {
    orders: 'Приходы',
    noOrders: 'Приходов нет',
    orderName: 'Рандомное название прихода',
    products: 'Продукты',
    productWord: {
      none: "Нет продуктов",
      one: "Продукт",
      few: "Продукта",
      many: "Продуктов"
    },
    status: {
      avail: 'Свободен',
      repair: 'В ремонте'
    },
    types: 'Тип',
    specification: 'Спецификация',
    filters: {
      types: {
        monitors: 'Монитор',
        all: 'Все'
      },
      specification: {
        new: 'Новый',
        used: 'Б/У',
        all: 'Все',
      }
    },
    guarantee: {
      from: 'с',
      to: 'по'
    },
    total: 'Всего',
    untitled: 'Без названия',
    addProduct: 'Добавить продукт',
    cancel: 'Отменить',
    delete: 'Удалить',
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'ru',
  fallbackLocale: 'en',
  messages
})