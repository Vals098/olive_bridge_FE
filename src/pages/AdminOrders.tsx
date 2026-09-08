import { useEffect } from "react"
import { Card, Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import type { AppDispatch, RootState } from "../redux/store"
import { getAdminOrders } from "../redux/actions/adminAction/getAdminOrders"

function AdminOrders() {
  const dispatch = useDispatch<AppDispatch>()

  const orders = useSelector(
    (state: RootState) => state.admin.orders,
  )

  useEffect(() => {
    dispatch(getAdminOrders())
  }, [dispatch])

  return (
    <main className="admin-orders-page">
      <Container>

        {/* HEADER */}
        <div className="admin-page-header">
          <p className="admin-dashboard-label">OLIVEBRIDGE</p>

          <h1>Orders</h1>

          <p>
            Manage and keep track of all orders received through
            OliveBridge.
          </p>
        </div>

        {/* ORDERS */}
        <Card className="admin-orders-card">
          <Card.Body>

            <div className="admin-orders-header">
              <div>
                <p className="admin-dashboard-card-label">
                  ORDER MANAGEMENT
                </p>

                <h2>All Orders</h2>
              </div>

              <span className="admin-dashboard-count">
                {orders.length}
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="admin-dashboard-empty">
                <p>No orders received yet.</p>
              </div>
            ) : (
              <div className="admin-orders-list">
                {orders.map((order) => (
                  <div
                    className="admin-order-item"
                    key={order.orderId}
                  >

                    {/* TOP */}
                    <div className="admin-order-header">
                      <div>
                        <span className="admin-order-label">
                          ORDER
                        </span>

                        <h3>
                          #{order.orderId.slice(0, 8)}
                        </h3>
                      </div>

                      <span
                        className={`admin-order-status status-${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* INFO */}
                    <div className="admin-order-info">

                      <div>
                        <span>Customer</span>

                        <strong>
                          {order.customerEmail}
                        </strong>
                      </div>

                      <div>
                        <span>Date</span>

                        <strong>
                          {new Date(
                            order.orderDate,
                          ).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>Total</span>

                        <strong>
                          €{Number(order.total).toFixed(2)}
                        </strong>
                      </div>

                    </div>

                    {/* PAYMENT */}
                    <div className="admin-order-payment">

                      <div>
                        <span>Payment method</span>

                        <strong>
                          {order.paymentMethod.replace(
                            "_",
                            " ",
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>Payment status</span>

                        <strong
                          className={`admin-payment-status payment-${order.paymentStatus.toLowerCase()}`}
                        >
                          {order.paymentStatus}
                        </strong>
                      </div>

                    </div>

                    {/* FOOTER */}
                    <div className="admin-order-footer">

                      <span>
                        Order ID: {order.orderId}
                      </span>

                      <button type="button">
                        View order →
                      </button>

                    </div>

                  </div>
                ))}
              </div>
            )}

          </Card.Body>
        </Card>

      </Container>
    </main>
  )
}

export default AdminOrders