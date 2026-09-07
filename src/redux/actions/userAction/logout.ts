import type { UnknownAction } from "@reduxjs/toolkit"
import type { AppDispatch } from "../../store"
import { clearCartAction } from "../cartAction/clearCart"

export const LOGOUT = "LOGOUT"

export type LogoutAction = UnknownAction & {
  type: typeof LOGOUT
}

export const logoutAction = () => {
  return (dispatch: AppDispatch) => {
    localStorage.removeItem("token")

    dispatch(clearCartAction())

    dispatch({
      type: LOGOUT,
    })
  }
}
