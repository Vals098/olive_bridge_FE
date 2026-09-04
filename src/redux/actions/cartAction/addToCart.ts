import type { CartItem } from "../../../types/CartItem"

export const ADD_TO_CART = "ADD_TO_CART"

export type AddToCartAction = {
  type: typeof ADD_TO_CART
  payload: CartItem
}

export const addToCartAction = (product: CartItem) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  }
}
