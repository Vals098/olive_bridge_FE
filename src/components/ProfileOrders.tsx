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
    <Card className="profile-card">
      <Card.Body>
        <div className="profile-section-label">
          MY ORDERS
        </div>

        <h2>My Orders</h2>

        {orders.length === 0 ? (
          <p>You don't have any orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.orderId}>
              <p>
                <strong>Order:</strong> {order.orderId}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.orderDate).toLocaleDateString()}
              </p>

              <p>
                <strong>Total:</strong> €{order.total.toFixed(2)}
              </p>

              <p>
                <strong>Status:</strong> {order.status}
              </p>
            </div>
          ))
        )}
      </Card.Body>
    </Card>
  )
}

export default ProfileOrders