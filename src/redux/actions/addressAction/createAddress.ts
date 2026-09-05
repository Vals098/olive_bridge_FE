import type { AppDispatch } from "../../store"
import type { AddressRequest } from "../../../types/AddressRequest"
import type { Address } from "../../../types/Address"

export const CREATE_ADDRESS = "CREATE_ADDRESS"

export type CreateAddressAction = {
  type: typeof CREATE_ADDRESS
  payload: Address
}

export const createAddress = (data: AddressRequest) => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) {
      return
    }

    try {
      const response = await fetch(
        "http://localhost:8080/users/addresses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      )

      if (!response.ok) {
        throw new Error("Unable to create address")
      }

      const address: Address = await response.json()

      dispatch({
        type: CREATE_ADDRESS,
        payload: address,
      })
    } catch (error) {
      console.error("Create address error:", error)
    }
  }
}