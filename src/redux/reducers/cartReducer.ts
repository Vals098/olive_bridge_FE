import type { UnknownAction } from "@reduxjs/toolkit"
import type { CartItem } from "../../types/CartItem"
import { ADD_TO_CART } from "../actions/cartAction/addToCart"
import { INCREASE_QUANTITY } from "../actions/cartAction/increaseQuantity"
import { REMOVE_FROM_CART } from "../actions/cartAction/removeFromCart"
import { DECREASE_QUANTITY } from "../actions/cartAction/decreaseQuantity"
import { CLEAR_CART } from "../actions/cartAction/clearCart"

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
  if (action.type === REMOVE_FROM_CART && "payload" in action) {
    const productVariantId = action.payload as string

    return {
      ...state,
      items: state.items.filter(
        (item) => item.variant.productVariantId !== productVariantId,
      ),
    }
  }
  if (action.type === DECREASE_QUANTITY && "payload" in action) {
    const productVariantId = action.payload as string

    const item = state.items.find(
      (item) => item.variant.productVariantId === productVariantId,
    )

    if (!item) {
      return state
    }

    if (item.quantity === 1) {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.variant.productVariantId !== productVariantId,
        ),
      }
    }

    return {
      ...state,
      items: state.items.map((item) =>
        item.variant.productVariantId === productVariantId
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      ),
    }
  }

  if (action.type === CLEAR_CART) {
    return {
      ...state,
      items: [],
    }
  }

  return state
}

export default cartReducer
