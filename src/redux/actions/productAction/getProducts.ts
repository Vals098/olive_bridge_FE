import type { AppDispatch } from "../../store"
import type { Product } from "../../../types/Product"
import { API_URL } from "../../../api"

export const GET_PRODUCTS = "GET_PRODUCTS"

export const getProducts = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${API_URL}/products`)

      if (!response.ok) {
        throw new Error("Unable to retrieve products")
      }

      const products: Product[] = await response.json()

      dispatch({
        type: GET_PRODUCTS,
        payload: products,
      })
    } catch (error) {
      console.error("Products retrieval error:", error)
    }
  }
}
