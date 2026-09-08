import type { AppDispatch } from "../../store"
import type { Category } from "../../../types/Category"
import { API_URL } from "../../../api"

export const GET_CATEGORIES = "GET_CATEGORIES"

export type GetCategoriesAction = {
  type: typeof GET_CATEGORIES
  payload: Category[]
}

export const getCategories = () => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) return

    try {
      const response = await fetch(`${API_URL}/admin/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Unable to retrieve categories")
      }

      const categories: Category[] = await response.json()

      dispatch({
        type: GET_CATEGORIES,
        payload: categories,
      })
    } catch (error) {
      console.error("Categories retrieval error:", error)
    }
  }
}
