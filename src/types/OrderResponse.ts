import type { OrderStatus } from "./OrderStatus"

export interface OrderResponse {
  orderId: string
  customerEmail: string
  orderDate: string
  total: number
  status: OrderStatus

  shippingRecipientName: string
  shippingPostalCode: string
  shippingPrefecture: string
  shippingCity: string
  shippingArea: string
  shippingStreet: string
  shippingBuilding: string | null

  billingPostalCode: string
  billingPrefecture: string
  billingCity: string
  billingArea: string
  billingStreet: string
  billingBuilding: string | null
}