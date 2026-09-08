import type { UnknownAction } from "@reduxjs/toolkit"
import type { OrderResponse } from "../../types/OrderResponse"

import {
  GET_MY_ORDERS,
  type GetMyOrdersAction,
} from "../actions/orderAction/getMyOrders"

interface OrderState {
  orders: OrderResponse[]
}

const initialState: OrderState = {
  orders: [],
}

const isGetMyOrdersAction = (
  action: UnknownAction,
): action is GetMyOrdersAction => {
  return action.type === GET_MY_ORDERS && "payload" in action
}

const orderReducer = (
  state = initialState,
  action: UnknownAction,
): OrderState => {
  if (isGetMyOrdersAction(action)) {
    return {
      ...state,
      orders: action.payload,
    }
  }

  return state
}

export default orderReducer