export const CLEAR_CART = "CLEAR_CART"

export type ClearCartAction = {
  type: typeof CLEAR_CART
}

export const clearCartAction = () => {
  return {
    type: CLEAR_CART,
  }
}