import type { AppDispatch } from "../../store"

export const REMOVE_FAVOURITE = "REMOVE_FAVOURITE"

export type RemoveFavouriteAction = {
  type: typeof REMOVE_FAVOURITE
  payload: string
}

export const removeFavourite = (productId: string) => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:8080/users/favourites/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error("Unable to remove favourite")
      }

      dispatch({
        type: REMOVE_FAVOURITE,
        payload: productId,
      })
    } catch (error) {
      console.error("Remove favourite error:", error)
    }
  }
}