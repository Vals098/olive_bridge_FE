import type { AppDispatch } from "../../store"
import type { AddressRequest } from "../../../types/AddressRequest"
import type { Address } from "../../../types/Address"

export const UPDATE_ADDRESS = "UPDATE_ADDRESS"

export type UpdateAddressAction = {
  type: typeof UPDATE_ADDRESS
  payload: Address
}

export const updateAddress = (
  addressId: string,
  data: AddressRequest
) => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) {
      return
    }

    try {
      const response = await fetch(
        `http://localhost:8080/users/addresses/${addressId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      )

      if (!response.ok) {
        throw new Error("Unable to update address")
      }

      const address: Address = await response.json()

      dispatch({
        type: UPDATE_ADDRESS,
        payload: address,
      })
    } catch (error) {
      console.error("Update address error:", error)
    }
  }
}