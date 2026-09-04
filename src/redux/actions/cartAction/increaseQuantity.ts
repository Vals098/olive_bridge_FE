export const INCREASE_QUANTITY = "INCREASE_QUANTITY"

export type IncreaseQuantityAction = {
  type: typeof INCREASE_QUANTITY
  payload: string
}

export const increaseQuantityAction = (productVariantId: string) => {
  return {
    type: INCREASE_QUANTITY,
    payload: productVariantId,
  }
}