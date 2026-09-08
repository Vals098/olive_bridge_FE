import type { OrderStatus } from "./OrderStatus"
import type { PaymentMethod } from "./PaymentMethod"
import type { PaymentStatus } from "./PaymentStatus"

export interface Order {
  orderId: string
  customerEmail: string
  orderDate: string
  total: number
  status: OrderStatus

  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus

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