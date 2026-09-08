import type { AppDispatch } from "../../store"
import type { Order } from "../../../types/Order"
import { API_URL } from "../../../api"

export const GET_ADMIN_ORDERS = "GET_ADMIN_ORDERS"

export type GetAdminOrdersAction = {
  type: typeof GET_ADMIN_ORDERS
  payload: Order[]
}

export const getAdminOrders = () => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) return

    try {
      const response = await fetch(`${API_URL}/admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Unable to retrieve admin orders")
      }

      const orders: Order[] = await response.json()

      dispatch({
        type: GET_ADMIN_ORDERS,
        payload: orders,
      })
    } catch (error) {
      console.error("Get admin orders error:", error)
    }
  }
}
