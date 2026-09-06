import type { AppDispatch } from "../../store"
import type { Favourite } from "../../../types/Favourite"

export const ADD_FAVOURITE = "ADD_FAVOURITE"

export type AddFavouriteAction = {
  type: typeof ADD_FAVOURITE
  payload: Favourite
}

export const addFavourite = (productId: string) => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:8080/users/favourites/${productId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error("Unable to add favourite")
      }

      const favourite: Favourite = await response.json()

      dispatch({
        type: ADD_FAVOURITE,
        payload: favourite,
      })
    } catch (error) {
      console.error("Add favourite error:", error)
    }
  }
}