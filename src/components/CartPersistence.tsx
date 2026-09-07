import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"
import { saveCart } from "../redux/cartStorage"

function CartPersistence() {
  const cartItems = useSelector((state: RootState) => state.cart.items)

  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser
  )

  const previousUserId = useRef<string | null | undefined>(undefined)

useEffect(() => {
  const currentUserId = currentUser?.userId ?? null

  // Primo caricamento dell'app:
  // non salviamo ancora nulla.
  if (previousUserId.current === undefined) {
    previousUserId.current = currentUserId
    return
  }

  // L'utente è cambiato:
  // aggiorniamo il riferimento ma non salviamo il carrello.
  if (previousUserId.current !== currentUserId) {
    previousUserId.current = currentUserId
    return
  }

  // L'utente non è cambiato: salviamo normalmente.
  saveCart(currentUserId, cartItems)
}, [cartItems, currentUser])

  return null
}

export default CartPersistence