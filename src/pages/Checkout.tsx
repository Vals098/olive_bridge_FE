import { useSelector } from "react-redux"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../redux/store"
import { Form, Button, Container } from "react-bootstrap"
import type { SyntheticEvent } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../redux/store"
import { clearCartAction } from "../redux/actions/cartAction/clearCart"
import type { OrderResponse } from "../types/OrderResponse"

function Checkout() {
  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()

  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [shippingPostalCode, setShippingPostalCode] = useState("")
  const [shippingPrefecture, setShippingPrefecture] = useState("")
  const [shippingCity, setShippingCity] = useState("")
  const [shippingArea, setShippingArea] = useState("")
  const [shippingStreet, setShippingStreet] = useState("")
  const [shippingBuilding, setShippingBuilding] = useState("")
  const [order, setOrder] = useState<OrderResponse | null>(null)
  const [error, setError] = useState("")

  const cartItems = useSelector((state: RootState) => state.cart.items)

  if (order) {
    return (
      <Container className="py-5">
        <h1>Order confirmed!</h1>

        <p>Order ID: {order.orderId}</p>

        <p>Total: €{Number(order.total).toFixed(2)}</p>

        <p>Thank you for your order!</p>
      </Container>
    )
  }

  if (cartItems.length === 0) {
    return (
      <Container className="py-5">
        <h1>Your cart is empty.</h1>

        <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
      </Container>
    )
  }

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.variant.price * item.quantity,
    0,
  )

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    setError("")

    const orderData = {
      customerName,
      customerEmail,
      shippingPostalCode,
      shippingPrefecture,
      shippingCity,
      shippingArea,
      shippingStreet,
      shippingBuilding,
      items: cartItems.map((item) => ({
        productVariantId: item.variant.productVariantId,
        quantity: item.quantity,
      })),
    }

    try {
      const response = await fetch("http://localhost:8080/orders/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error("Unable to place order")
      }

      const createdOrder: OrderResponse = await response.json()

      setOrder(createdOrder)

      dispatch(clearCartAction())
    } catch {
      setError("Unable to place order. Please try again.")
    }
  }

  return (
    <Container className="py-5">
      <h1>Checkout</h1>

      <h2>Order summary</h2>

      {cartItems.map((item) => (
        <div key={item.variant.productVariantId}>
          <h3>{item.product.name}</h3>

          <p>Format: {item.variant.format}</p>

          <p>Quantity: {item.quantity}</p>

          <p>Subtotal: €{(item.variant.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}

      <h3>Total: €{cartTotal.toFixed(2)}</h3>

      {error && <p>{error}</p>}

      <Form onSubmit={handleSubmit}>
        <h2>Customer information</h2>

        <Form.Control
          type="text"
          placeholder="Enter your name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />

        <Form.Control
          type="email"
          placeholder="Enter your email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          required
        />

        <h2>Shipping address</h2>

        <Form.Control
          type="text"
          placeholder="Enter your postal code"
          value={shippingPostalCode}
          onChange={(e) => setShippingPostalCode(e.target.value)}
          required
        />

        <Form.Control
          type="text"
          placeholder="Enter your prefecture"
          value={shippingPrefecture}
          onChange={(e) => setShippingPrefecture(e.target.value)}
          required
        />

        <Form.Control
          type="text"
          placeholder="Enter your city"
          value={shippingCity}
          onChange={(e) => setShippingCity(e.target.value)}
          required
        />

        <Form.Control
          type="text"
          placeholder="Enter your area"
          value={shippingArea}
          onChange={(e) => setShippingArea(e.target.value)}
          required
        />

        <Form.Control
          type="text"
          placeholder="Enter your street"
          value={shippingStreet}
          onChange={(e) => setShippingStreet(e.target.value)}
          required
        />

        <Form.Control
          type="text"
          placeholder="Enter your building (optional)"
          value={shippingBuilding}
          onChange={(e) => setShippingBuilding(e.target.value)}
        />

        <Button type="submit">Place Order</Button>
      </Form>
    </Container>
  )
}

export default Checkout
