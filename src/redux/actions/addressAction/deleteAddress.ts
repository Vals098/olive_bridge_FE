import type { AppDispatch } from "../../store"
import { API_URL } from "../../../api"

export const DELETE_ADDRESS = "DELETE_ADDRESS"

export type DeleteAddressAction = {
  type: typeof DELETE_ADDRESS
  payload: string
}

export const deleteAddress = (addressId: string) => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/users/addresses/${addressId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Unable to delete address")
      }

      dispatch({
        type: DELETE_ADDRESS,
        payload: addressId,
      })
    } catch (error) {
      console.error("Delete address error:", error)
    }
  }
}
