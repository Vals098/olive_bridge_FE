export const DECREASE_QUANTITY = "DECREASE_QUANTITY"

export type DecreaseQuantityAction = {
  type: typeof DECREASE_QUANTITY
  payload: string
}

export const decreaseQuantityAction = (productVariantId: string) => {
  return {
    type: DECREASE_QUANTITY,
    payload: productVariantId,
  }
}