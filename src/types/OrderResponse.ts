import type { OrderStatus } from "./OrderStatus"

export type PaymentMethod =
  | "CREDIT_CARD"
  | "PAYPAL"
  | "BANK_TRANSFER"

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED"

export interface OrderResponse {
  orderId: string
  customerEmail: string
  orderDate: string
  total: number
  status: OrderStatus

  // PAYMENT
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus

  // SHIPPING
  shippingRecipientName: string
  shippingPostalCode: string
  shippingPrefecture: string
  shippingCity: string
  shippingArea: string
  shippingStreet: string
  shippingBuilding: string | null

  // BILLING
  billingPostalCode: string
  billingPrefecture: string
  billingCity: string
  billingArea: string
  billingStreet: string
  billingBuilding: string | null
}