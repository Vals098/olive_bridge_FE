import type { AppDispatch } from "../../store"
import type { Product } from "../../../types/Product"
import { API_URL } from "../../../api"

export const GET_ADMIN_PRODUCTS = "GET_ADMIN_PRODUCTS"

export type GetAdminProductsAction = {
  type: typeof GET_ADMIN_PRODUCTS
  payload: Product[]
}

export const getAdminProducts = () => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) return

    try {
      const response = await fetch(`${API_URL}/admin/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Unable to retrieve admin products")
      }

      const products: Product[] = await response.json()

      dispatch({
        type: GET_ADMIN_PRODUCTS,
        payload: products,
      })
    } catch (error) {
      console.error("Admin products retrieval error:", error)
    }
  }
}
