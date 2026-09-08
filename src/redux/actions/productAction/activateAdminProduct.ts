import type { AppDispatch } from "../../store"
import type { Product } from "../../../types/Product"
import { API_URL } from "../../../api"

export const ACTIVATE_ADMIN_PRODUCT = "ACTIVATE_ADMIN_PRODUCT"

export type ActivateAdminProductAction = {
  type: typeof ACTIVATE_ADMIN_PRODUCT
  payload: Product
}

export const activateAdminProduct = (productId: string) => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) return

    try {
      const response = await fetch(
        `${API_URL}/admin/products/${productId}/activate`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error("Unable to activate product")
      }

      const product: Product = await response.json()

      dispatch({
        type: ACTIVATE_ADMIN_PRODUCT,
        payload: product,
      })
    } catch (error) {
      console.error("Product activation error:", error)
    }
  }
}
