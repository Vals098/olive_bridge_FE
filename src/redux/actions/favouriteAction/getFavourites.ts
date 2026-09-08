import type { AppDispatch } from "../../store"
import type { Favourite } from "../../../types/Favourite"
import { API_URL } from "../../../api"

export const GET_FAVOURITES = "GET_FAVOURITES"

export type GetFavouritesAction = {
  type: typeof GET_FAVOURITES
  payload: Favourite[]
}

export const getFavourites = () => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/users/favourites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Unable to retrieve favourites")
      }

      const favourites: Favourite[] = await response.json()

      dispatch({
        type: GET_FAVOURITES,
        payload: favourites,
      })
    } catch (error) {
      console.error("Get favourites error:", error)
    }
  }
}
