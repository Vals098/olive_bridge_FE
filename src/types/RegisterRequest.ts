import type { AccountType } from "./AccountType"

export interface RegisterRequest {
  name: string
  surname: string
  email: string
  password: string
  accountType: AccountType
}