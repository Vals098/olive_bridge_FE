import type { UnknownAction } from "@reduxjs/toolkit"
import type { CartItem } from "../../types/CartItem"
import { ADD_TO_CART } from "../actions/cartAction/addToCart"
import { INCREASE_QUANTITY } from "../actions/cartAction/increaseQuantity"

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartReducer = (
  state = initialState,
  action: UnknownAction,
): CartState => {
  if (action.type === ADD_TO_CART && "payload" in action) {
    const product = action.payload as CartItem

    const existingItem = state.items.find(
      (item) =>
        item.variant.productVariantId === product.variant.productVariantId,
    )

    if (existingItem) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.variant.productVariantId === product.variant.productVariantId
            ? {
                ...item,
                quantity: item.quantity + product.quantity,
              }
            : item,
        ),
      }
    }

    return {
      ...state,
      items: [...state.items, product],
    }
  }
  if (action.type === INCREASE_QUANTITY && "payload" in action) {
    const productVariantId = action.payload as string

    return {
      ...state,
      items: state.items.map((item) =>
        item.variant.productVariantId === productVariantId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    }
  }

  return state
}

export default cartReducer
