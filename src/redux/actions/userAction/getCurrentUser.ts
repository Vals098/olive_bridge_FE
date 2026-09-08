import type { AppDispatch } from "../../store"
import type { User } from "../../../types/User"
import { API_URL } from "../../../api"

export const GET_CURRENT_USER = "GET_CURRENT_USER"

export type GetCurrentUserAction = {
  type: typeof GET_CURRENT_USER
  payload: User
}

export const getCurrentUser = () => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Unable to retrieve user")
      }

      const user: User = await response.json()

      dispatch({
        type: GET_CURRENT_USER,
        payload: user,
      })
    } catch (error) {
      console.error("Authentication restore error:", error)
    }
  }
}
