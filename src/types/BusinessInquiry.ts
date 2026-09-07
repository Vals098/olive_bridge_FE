export interface BusinessInquiry {
  businessInquiryId: string
  subject: string
  message: string
  status: string
  createdAt: string
}

export interface BusinessInquiryRequest {
  subject: string
  message: string
}