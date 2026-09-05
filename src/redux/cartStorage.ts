import type { CartItem } from "../types/CartItem"

export const getCartKey = (userId: string | null) => {
  return userId ? `cart_${userId}` : "cart_guest"
}

export const getSavedCart = (userId: string | null): CartItem[] => {
  const key = getCartKey(userId)
  const savedCart = localStorage.getItem(key)

  if (!savedCart) {
    return []
  }

  return JSON.parse(savedCart)
}

export const saveCart = (
  userId: string | null,
  items: CartItem[],
) => {
  const key = getCartKey(userId)

  localStorage.setItem(key, JSON.stringify(items))
}