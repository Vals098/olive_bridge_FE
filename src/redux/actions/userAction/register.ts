import type { RegisterRequest } from "../../../types/RegisterRequest"
import { API_URL } from "../../../api"

export const registerAction = async (data: RegisterRequest) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Unable to register")
  }

  return await response.json()
}
