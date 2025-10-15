export interface Price {
  symbol: string
  value: number
  isDefault?: boolean
}

export interface Guarantee {
  start: string
  end: string
}

export interface Product {
  id: number
  serialNumber: number
  isNew: number
  photo: string
  title: string
  type: string
  specification: string
  status: string
  guarantee: Guarantee
  order?: number | null
  price: Price[]
  date: string
}

export interface Order {
  id: number
  title: string
  date: string
  description?: string
  products?: Product[]
  totalUSD?: number
  totalUAH?: number
}
