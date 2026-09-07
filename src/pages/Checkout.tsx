import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import type { SyntheticEvent } from "react"

import type { RootState, AppDispatch } from "../redux/store"
import type { CartItem } from "../types/CartItem"

import { clearCartAction } from "../redux/actions/cartAction/clearCart"
import type { OrderResponse } from "../types/OrderResponse"

import type { Address } from "../types/Address"
import { getAddresses } from "../redux/actions/addressAction/getAddresses"

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

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  )

  const addresses = useSelector((state: RootState) => state.address.addresses)

  const cartItems: CartItem[] = useSelector(
    (state: RootState) => state.cart.items,
  )

  const currentUser = useSelector((state: RootState) => state.user.currentUser)

  useEffect(() => {
    if (currentUser) {
      dispatch(getAddresses())
    }
  }, [currentUser, dispatch])

  if (order) {
    return (
      <main className="checkout-page">
        <Container>
          <div className="checkout-confirmation">
            <p className="checkout-label">OLIVEBRIDGE</p>

            <div className="checkout-confirmation-icon">✓</div>

            <h1>Order confirmed!</h1>

            <p className="checkout-confirmation-message">
              Thank you for your order. We hope you enjoy your OliveBridge
              selection.
            </p>

            <div className="checkout-order-details">
              <p>
                <span>Order ID</span>
                <strong>{order.orderId}</strong>
              </p>

              <p>
                <span>Total</span>
                <strong>€{Number(order.total).toFixed(2)}</strong>
              </p>
            </div>

            <Button
              className="checkout-button"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </Button>
          </div>
        </Container>
      </main>
    )
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <Container>
          <div className="checkout-empty">
            <p className="checkout-label">OLIVEBRIDGE</p>

            <h1>Your cart is empty</h1>

            <p>Add some products to your cart before proceeding to checkout.</p>

            <Button
              className="checkout-button"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </Button>
          </div>
        </Container>
      </main>
    )
  }

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.variant.price * item.quantity,
    0,
  )

  const handleSelectAddress = (address: Address) => {
    setSelectedAddressId(address.addressId)

    setCustomerName(address.recipientName)
    setShippingPostalCode(address.postalCode)
    setShippingPrefecture(address.prefecture)
    setShippingCity(address.city)
    setShippingArea(address.area)
    setShippingStreet(address.street)
    setShippingBuilding(address.building ?? "")
  }

  const handleNewAddress = () => {
    setSelectedAddressId(null)

    setShippingPostalCode("")
    setShippingPrefecture("")
    setShippingCity("")
    setShippingArea("")
    setShippingStreet("")
    setShippingBuilding("")
  }

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
    <main className="checkout-page">
      <Container>
        <div className="checkout-header">
          <p className="checkout-label">OLIVEBRIDGE</p>

          <h1>Checkout</h1>

          <p>
            Complete your order and bring authentic Italian olive oil to your
            table.
          </p>
        </div>

        {!currentUser && (
          <div className="checkout-account-options">
            <div>
              <h2>Already have an account?</h2>

              <p>
                Log in or register to save your information and access your
                account features.
              </p>
            </div>

            <div className="checkout-account-buttons">
              <Button
                className="checkout-button"
                onClick={() => navigate("/login?redirect=/checkout")}
              >
                Login
              </Button>

              <Button
                variant="outline-dark"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </div>

            <p className="checkout-guest-message">
              Or continue as a guest and complete your order below.
            </p>
          </div>
        )}

        <Row className="g-5">
          <Col lg={7}>
            <Card className="checkout-form-card">
              <Card.Body>
                <h2>Customer information</h2>

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4" controlId="customerName">
                        <Form.Label>Name</Form.Label>

                        <Form.Control
                          type="text"
                          placeholder="Enter your name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-4" controlId="customerEmail">
                        <Form.Label>Email</Form.Label>

                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <h2 className="checkout-section-title">Shipping address</h2>

                  {(!currentUser ||
                    addresses.length === 0 ||
                    selectedAddressId === null) && (
                    <div className="checkout-saved-addresses">
                      <p className="checkout-address-intro">
                        Choose a saved address or enter a new one.
                      </p>

                      {addresses.map((address) => (
                        <button
                          type="button"
                          key={address.addressId}
                          className={`checkout-address-option ${
                            selectedAddressId === address.addressId
                              ? "checkout-address-option-selected"
                              : ""
                          }`}
                          onClick={() => handleSelectAddress(address)}
                        >
                          <div className="checkout-address-radio">
                            {selectedAddressId === address.addressId
                              ? "●"
                              : "○"}
                          </div>

                          <div>
                            <strong>{address.label}</strong>

                            <p>
                              {address.recipientName}
                              <br />
                              {address.postalCode} {address.city}
                              <br />
                              {address.prefecture}, {address.area}
                              <br />
                              {address.street}
                              {address.building && `, ${address.building}`}
                            </p>
                          </div>
                        </button>
                      ))}

                      <button
                        type="button"
                        className={`checkout-address-option checkout-new-address-option ${
                          selectedAddressId === null
                            ? "checkout-address-option-selected"
                            : ""
                        }`}
                        onClick={handleNewAddress}
                      >
                        <div className="checkout-address-radio">
                          {selectedAddressId === null ? "●" : "○"}
                        </div>

                        <div>
                          <strong>Enter a new address</strong>

                          <p>Use a different shipping address.</p>
                        </div>
                      </button>
                    </div>
                  )}

                  <Row>
                    <Col md={6}>
                      <Form.Group
                        className="mb-4"
                        controlId="shippingPostalCode"
                      >
                        <Form.Label>Postal code</Form.Label>

                        <Form.Control
                          type="text"
                          placeholder="Enter your postal code"
                          value={shippingPostalCode}
                          onChange={(e) =>
                            setShippingPostalCode(e.target.value)
                          }
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group
                        className="mb-4"
                        controlId="shippingPrefecture"
                      >
                        <Form.Label>Prefecture</Form.Label>

                        <Form.Control
                          type="text"
                          placeholder="Enter your prefecture"
                          value={shippingPrefecture}
                          onChange={(e) =>
                            setShippingPrefecture(e.target.value)
                          }
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4" controlId="shippingCity">
                    <Form.Label>City</Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="Enter your city"
                      value={shippingCity}
                      onChange={(e) => setShippingCity(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="shippingArea">
                    <Form.Label>Area</Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="Enter your area"
                      value={shippingArea}
                      onChange={(e) => setShippingArea(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="shippingStreet">
                    <Form.Label>Street</Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="Enter your street"
                      value={shippingStreet}
                      onChange={(e) => setShippingStreet(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="shippingBuilding">
                    <Form.Label>Building</Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="Enter your building (optional)"
                      value={shippingBuilding}
                      onChange={(e) => setShippingBuilding(e.target.value)}
                    />
                  </Form.Group>

                  {error && <div className="checkout-error">{error}</div>}

                  <Button
                    type="submit"
                    className="checkout-button checkout-place-order"
                  >
                    Place Order
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5}>
            <Card className="checkout-summary">
              <Card.Body>
                <h2>Order Summary</h2>

                {cartItems.map((item) => (
                  <div
                    className="checkout-summary-item"
                    key={item.variant.productVariantId}
                  >
                    <div>
                      <h3>{item.product.name}</h3>

                      <p>
                        {item.variant.format} × {item.quantity}
                      </p>
                    </div>

                    <strong>
                      €{(item.variant.price * item.quantity).toFixed(2)}
                    </strong>
                  </div>
                ))}

                <div className="checkout-summary-divider" />

                <div className="checkout-summary-total">
                  <span>Total</span>

                  <strong>€{cartTotal.toFixed(2)}</strong>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Checkout
