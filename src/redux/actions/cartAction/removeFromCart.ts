export const REMOVE_FROM_CART = "REMOVE_FROM_CART"

export type RemoveFromCartAction = {
  type: typeof REMOVE_FROM_CART
  payload: string
}

export const removeFromCartAction = (productVariantId: string) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productVariantId,
  }
}