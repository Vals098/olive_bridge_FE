import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { AppDispatch, RootState } from "../redux/store"
import { increaseQuantityAction } from "../redux/actions/cartAction/increaseQuantity"
import { removeFromCartAction } from "../redux/actions/cartAction/removeFromCart"
import { decreaseQuantityAction } from "../redux/actions/cartAction/decreaseQuantity"

import { Button } from "react-bootstrap"

function Cart() {
  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()

  const cartItems = useSelector((state: RootState) => state.cart.items)

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.variant.price * item.quantity,
    0,
  )

  return (
    <div>
      <h1>Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.variant.productVariantId}>
            <h2>{item.product.name}</h2>
            <p>{item.product.description}</p>
            <p>Format: {item.variant.format}</p>
            <p>Price: €{item.variant.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <Button
              onClick={() =>
                dispatch(increaseQuantityAction(item.variant.productVariantId))
              }
            >
              +
            </Button>
            <Button
              onClick={() =>
                dispatch(decreaseQuantityAction(item.variant.productVariantId))
              }
            >
              −
            </Button>
            <Button
              onClick={() =>
                dispatch(removeFromCartAction(item.variant.productVariantId))
              }
            >
              🗑
            </Button>
            <p>Subtotal: €{(item.variant.price * item.quantity).toFixed(2)}</p>
          </div>
        ))
      )}
      <h2>Cart total: €{cartTotal.toFixed(2)}</h2>
      
      <Button onClick={() => navigate("/checkout")}>Checkout</Button>
    </div>
  )
}

export default Cart
