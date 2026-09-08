export interface UpdateUserRequest {
  name: string
  surname: string
  email: string
  businessName: string | null
  businessTaxId: string | null
}