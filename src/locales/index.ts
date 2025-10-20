import { createI18n } from "vue-i18n";

const messages = {
  en: {
    orders: 'Orders',
    noOrders: 'No orders',
    orderName: 'Randon order name',
    chartTitile: 'Chart of orders',
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
    deleteQ: 'Are you sure you want to delete this order?',
  },
  ru: {
    orders: 'Приходы',
    noOrders: 'Приходов нет',
    orderName: 'Рандомное название прихода',
    chartTitile: 'График приходов',
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
    deleteQ: 'Вы уверены, что хотите удалить этот приход?',
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'ru',
  fallbackLocale: 'en',
  messages
})