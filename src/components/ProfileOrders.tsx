import { useEffect } from "react"
import { Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import type { AppDispatch, RootState } from "../redux/store"
import { getMyOrders } from "../redux/actions/orderAction/getMyOrders"

function ProfileOrders() {
  const dispatch = useDispatch<AppDispatch>()

  const orders = useSelector(
    (state: RootState) => state.order.orders,
  )

  useEffect(() => {
    dispatch(getMyOrders())
  }, [dispatch])

  return (
    <Card className="profile-card profile-orders-card">
      <Card.Body>
        <div className="profile-section-label">MY ORDERS</div>

        <h2>My Orders</h2>

        <p className="profile-section-description">
          Your recent purchases and order history.
        </p>

        {orders.length === 0 ? (
          <div className="profile-empty-state">
            <p>You don't have any orders yet.</p>
          </div>
        ) : (
          <div className="profile-orders-list">
            {orders.map((order) => (
              <div className="profile-order-item" key={order.orderId}>
                <div className="profile-order-header">
                  <div>
                    <span className="profile-order-label">ORDER</span>

                    <h3>
                      #{order.orderId.slice(0, 8)}
                    </h3>
                  </div>

                  <span
                    className={`profile-order-status status-${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="profile-order-info">
                  <div>
                    <span>Date</span>

                    <strong>
                      {new Date(order.orderDate).toLocaleDateString(
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

                <div className="profile-order-footer">
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
  )
}

export default ProfileOrders