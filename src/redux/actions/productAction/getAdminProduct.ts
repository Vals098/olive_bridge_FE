import type { AppDispatch } from "../../store"
import type { Product } from "../../../types/Product"
import { API_URL } from "../../../api"

export const GET_ADMIN_PRODUCT = "GET_ADMIN_PRODUCT"

export type GetAdminProductAction = {
  type: typeof GET_ADMIN_PRODUCT
  payload: Product
}

export const getAdminProduct = (productId: string) => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) return

    try {
      const response = await fetch(`${API_URL}/admin/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Unable to retrieve product")
      }

      const product: Product = await response.json()

      dispatch({
        type: GET_ADMIN_PRODUCT,
        payload: product,
      })
    } catch (error) {
      console.error("Product retrieval error:", error)
    }
  }
}
