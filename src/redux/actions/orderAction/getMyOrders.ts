import type { AppDispatch } from "../../store"
import type { OrderResponse } from "../../../types/OrderResponse"

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
      const response = await fetch(
        "http://localhost:8080/users/me/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

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