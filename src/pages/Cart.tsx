import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button, Card, Col, Container, Row } from "react-bootstrap"

import type { AppDispatch, RootState } from "../redux/store"

import { increaseQuantityAction } from "../redux/actions/cartAction/increaseQuantity"
import { decreaseQuantityAction } from "../redux/actions/cartAction/decreaseQuantity"
import { removeFromCartAction } from "../redux/actions/cartAction/removeFromCart"

function Cart() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const cartItems = useSelector(
    (state: RootState) => state.cart.items,
  )

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.variant.price * item.quantity,
    0,
  )

  return (
    <main className="cart-page">
      <Container>
        <div className="cart-header">
          <p className="cart-label">OLIVEBRIDGE</p>
          <h1>Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <h2>Your cart is empty</h2>

            <p>
              Discover our selection of Italian extra virgin olive oils.
            </p>

            <Button
              className="cart-button"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <Row className="g-5">
            <Col lg={8}>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <Card
                    className="cart-item"
                    key={item.variant.productVariantId}
                  >
                    <Row className="g-0 align-items-center">
                      <Col xs={4} md={3}>
                        <img
                          src="/public/images/product-default.png"
                          alt={item.product.name}
                          className="cart-item-image"
                        />
                      </Col>

                      <Col xs={8} md={9}>
                        <Card.Body>
                          <div className="cart-item-content">
                            <div>
                              <p className="cart-item-category">
                                {item.product.category.name}
                              </p>

                              <h2>{item.product.name}</h2>

                              <p className="cart-item-format">
                                Format: {item.variant.format}
                              </p>

                              <p className="cart-item-price">
                                €{item.variant.price.toFixed(2)}
                              </p>
                            </div>

                            <div className="cart-item-actions">
                              <div className="quantity-controls">
                                <Button
                                  variant="outline-dark"
                                  onClick={() =>
                                    dispatch(
                                      decreaseQuantityAction(
                                        item.variant.productVariantId,
                                      ),
                                    )
                                  }
                                >
                                  −
                                </Button>

                                <span>{item.quantity}</span>

                                <Button
                                  variant="outline-dark"
                                  onClick={() =>
                                    dispatch(
                                      increaseQuantityAction(
                                        item.variant.productVariantId,
                                      ),
                                    )
                                  }
                                >
                                  +
                                </Button>
                              </div>

                              <Button
                                variant="link"
                                className="cart-remove"
                                onClick={() =>
                                  dispatch(
                                    removeFromCartAction(
                                      item.variant.productVariantId,
                                    ),
                                  )
                                }
                              >
                                Remove
                              </Button>
                            </div>

                            <p className="cart-item-subtotal">
                              Subtotal: €
                              {(
                                item.variant.price * item.quantity
                              ).toFixed(2)}
                            </p>
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
            </Col>

            <Col lg={4}>
              <Card className="cart-summary">
                <Card.Body>
                  <h2>Order Summary</h2>

                  <div className="cart-summary-row">
                    <span>Subtotal</span>
                    <span>€{cartTotal.toFixed(2)}</span>
                  </div>

                  <div className="cart-summary-divider" />

                  <div className="cart-summary-total">
                    <span>Total</span>
                    <strong>€{cartTotal.toFixed(2)}</strong>
                  </div>

                  <Button
                    className="cart-button cart-checkout-button"
                    onClick={() => navigate("/checkout")}
                  >
                    Checkout
                  </Button>

                  <Button
                    variant="link"
                    className="cart-continue-button"
                    onClick={() => navigate("/products")}
                  >
                    Continue Shopping
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </main>
  )
}

export default Cart