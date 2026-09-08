import type { AppDispatch } from "../../store"
import type { Product } from "../../../types/Product"
import type { ProductRequest } from "./createAdminProduct"
import { API_URL } from "../../../api"

export const UPDATE_ADMIN_PRODUCT = "UPDATE_ADMIN_PRODUCT"

export type UpdateAdminProductAction = {
  type: typeof UPDATE_ADMIN_PRODUCT
  payload: Product
}

export const updateAdminProduct = (productId: string, body: ProductRequest) => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) return

    try {
      const response = await fetch(`${API_URL}/admin/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error("Unable to update product")
      }

      const product: Product = await response.json()

      dispatch({
        type: UPDATE_ADMIN_PRODUCT,
        payload: product,
      })
    } catch (error) {
      console.error("Product update error:", error)
    }
  }
}
