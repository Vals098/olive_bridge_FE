import type { RegisterRequest } from "../../../types/RegisterRequest"

export const registerAction = async (data: RegisterRequest) => {
  const response = await fetch("http://localhost:8080/auth/register", {
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