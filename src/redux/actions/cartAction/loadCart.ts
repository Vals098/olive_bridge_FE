import type { CartItem } from "../../../types/CartItem"

export const LOAD_CART = "LOAD_CART"

export type LoadCartAction = {
  type: typeof LOAD_CART
  payload: CartItem[]
}

export const loadCartAction = (items: CartItem[]) => {
  return {
    type: LOAD_CART,
    payload: items,
  }
}