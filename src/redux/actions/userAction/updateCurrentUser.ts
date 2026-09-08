import type { AppDispatch } from "../../store"
import type { UpdateUserRequest } from "../../../types/UpdateUserRequest"
import type { User } from "../../../types/User"

export const UPDATE_CURRENT_USER = "UPDATE_CURRENT_USER"

export type UpdateCurrentUserAction = {
  type: typeof UPDATE_CURRENT_USER
  payload: User
}

export const updateCurrentUser = (data: UpdateUserRequest) => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) {
      throw new Error("User is not authenticated")
    }

    const response = await fetch("http://localhost:8080/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Unable to update profile")
    }

    const updatedUser: User = await response.json()

    dispatch({
      type: UPDATE_CURRENT_USER,
      payload: updatedUser,
    })

    localStorage.setItem("user", JSON.stringify(updatedUser))
  }
}