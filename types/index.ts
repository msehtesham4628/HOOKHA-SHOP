export interface Product {
  id: string
  name: string
  slug: string
  sku: string
  description?: string
  shortDescription?: string
  price: number
  salePrice?: number
  currency: string
  brandId: string
  categoryId: string
  weight?: number
  material?: string
  color?: string
  flavor?: string
  stock: number
  rating: number
  reviewCount: number
  isFeatured: boolean
  isNew: boolean
  isBestseller: boolean
  createdAt: Date
}

export interface Brand {
  id: string
  name: string
  slug: string
  description?: string
  logo?: string
  website?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
}

export interface ProductImage {
  id: string
  productId: string
  imageUrl: string
  altText?: string
  isPrimary: boolean
  sortOrder: number
}

export interface Cart {
  items: CartItem[]
  total: number
  subtotal: number
  tax: number
  shippingCost: number
  discount: number
}

export interface CartItem {
  productId: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  items: OrderItem[]
  status: OrderStatus
  total: number
  createdAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
}

export type OrderStatus =
  | 'PENDING'
  | 'PAYMENT_PROCESSING'
  | 'PAID'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED'

export interface User {
  id: string
  email: string
  name?: string
  image?: string
  role: 'CUSTOMER' | 'WHOLESALE' | 'ADMIN' | 'SUPER_ADMIN'
}

export interface Coupon {
  id: string
  code: string
  type: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING'
  value: number
  minOrderAmount: number
}

export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  title?: string
  content?: string
  verified: boolean
  createdAt: Date
}
