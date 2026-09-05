import type { AppDispatch } from "../../store"
import type { User } from "../../../types/User"
import type { LoginRequest } from "../../../types/LoginRequest"
import { loadCartAction } from "../cartAction/loadCart"
import { getSavedCart, mergeCarts, saveCart } from "../../cartStorage"

export const LOGIN = "LOGIN"

export type LoginAction = {
  type: typeof LOGIN
  payload: User
}

export const loginAction = (credentials: LoginRequest) => {
  return async (dispatch: AppDispatch) => {
    try {
      // 1. Login
      const loginResponse = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      if (!loginResponse.ok) {
        throw new Error("Invalid credentials")
      }

      const token = await loginResponse.text()

      localStorage.setItem("token", token)

      // 2. Get current user
      const userResponse = await fetch("http://localhost:8080/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!userResponse.ok) {
        throw new Error("Unable to retrieve user")
      }

      const user: User = await userResponse.json()

      // 3. Save user in Redux
      dispatch({
        type: LOGIN,
        payload: user,
      })

      // 4. Get user's cart and guest cart
      const userCart = getSavedCart(user.userId)
      const guestCart = getSavedCart(null)

      // 5. Merge guest cart into user's cart
      const mergedCart = mergeCarts(userCart, guestCart)

      // 6. Save merged cart as user's cart
      saveCart(user.userId, mergedCart)

      // 7. Remove guest cart
      localStorage.removeItem("cart_guest")

      // 8. Load merged cart into Redux
      dispatch(loadCartAction(mergedCart))
    } catch (error) {
      console.error("Login error:", error)
    }
  }
}
