import type { AppDispatch } from "../../store"
import type { OrderResponse } from "../../../types/OrderResponse"
import { API_URL } from "../../../api"

export const GET_MY_ORDERS = "GET_MY_ORDERS"

export type GetMyOrdersAction = {
  type: typeof GET_MY_ORDERS
  payload: OrderResponse[]
}

export const getMyOrders = () => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/users/me/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Unable to retrieve orders")
      }

      const orders: OrderResponse[] = await response.json()

      dispatch({
        type: GET_MY_ORDERS,
        payload: orders,
      })
    } catch (error) {
      console.error("Get my orders error:", error)
    }
  }
}
