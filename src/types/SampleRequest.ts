export interface SampleRequest {
  sampleRequestId: string
  productId: string
  message: string
  status: string
  createdAt: string

  recipientName: string
  postalCode: string
  prefecture: string
  city: string
  area: string
  street: string
  building: string | null
}