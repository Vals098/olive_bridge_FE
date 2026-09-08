import type { AppDispatch } from "../../store"
import type { Address } from "../../../types/Address"
import { API_URL } from "../../../api"

export const GET_ADDRESSES = "GET_ADDRESSES"

export type GetAddressesAction = {
  type: typeof GET_ADDRESSES
  payload: Address[]
}

export const getAddresses = () => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/users/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Unable to retrieve addresses")
      }

      const addresses: Address[] = await response.json()

      dispatch({
        type: GET_ADDRESSES,
        payload: addresses,
      })
    } catch (error) {
      console.error("Get addresses error:", error)
    }
  }
}
