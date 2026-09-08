import { useEffect } from "react"
import { Container, Card, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import type { AppDispatch, RootState } from "../redux/store"

import { getAdminSampleRequests } from "../redux/actions/adminAction/getAdminSampleRequests"
import { getAdminBusinessInquiries } from "../redux/actions/adminAction/getAdminBusinessInquiries"
import { getAdminOrders } from "../redux/actions/adminAction/getAdminOrders"
import { getProducts } from "../redux/actions/productAction/getProducts"

function AdminDashboard() {
  const dispatch = useDispatch<AppDispatch>()

  const sampleRequests = useSelector(
    (state: RootState) => state.admin.sampleRequests,
  )

  const businessInquiries = useSelector(
    (state: RootState) => state.admin.businessInquiries,
  )

  const orders = useSelector(
    (state: RootState) => state.admin.orders,
  )

  const products = useSelector(
    (state: RootState) => state.product.products,
  )

  useEffect(() => {
    dispatch(getAdminSampleRequests())
    dispatch(getAdminBusinessInquiries())
    dispatch(getAdminOrders())
  }, [dispatch])

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts())
    }
  }, [dispatch, products.length])

  return (
    <main className="admin-dashboard-page">
      <Container>

        {/* HEADER */}
        <div className="admin-dashboard-header">
          <p className="admin-dashboard-label">
            OLIVEBRIDGE
          </p>

          <h1>Admin Dashboard</h1>

          <p>
            Manage business requests and keep track of OliveBridge activity.
          </p>
        </div>

        {/* OVERVIEW */}
        <Row className="g-4 admin-dashboard-overview">

          <Col md={6} lg={3}>
            <Link
              to="/admin/orders"
              className="admin-overview-link"
            >
              <Card className="admin-overview-card h-100">
                <Card.Body>
                  <p className="admin-dashboard-card-label">
                    ORDERS
                  </p>

                  <h2>{orders.length}</h2>

                  <p>Total orders received</p>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={6} lg={3}>
            <Link
              to="/admin/products"
              className="admin-overview-link"
            >
              <Card className="admin-overview-card h-100">
                <Card.Body>
                  <p className="admin-dashboard-card-label">
                    PRODUCTS
                  </p>

                  <h2>{products.length}</h2>

                  <p>Products in catalog</p>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={6} lg={3}>
            <Link
              to="/admin/sample-requests"
              className="admin-overview-link"
            >
              <Card className="admin-overview-card h-100">
                <Card.Body>
                  <p className="admin-dashboard-card-label">
                    SAMPLE REQUESTS
                  </p>

                  <h2>{sampleRequests.length}</h2>

                  <p>Requests received</p>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={6} lg={3}>
            <Link
              to="/admin/business-inquiries"
              className="admin-overview-link"
            >
              <Card className="admin-overview-card h-100">
                <Card.Body>
                  <p className="admin-dashboard-card-label">
                    INQUIRIES
                  </p>

                  <h2>{businessInquiries.length}</h2>

                  <p>Business inquiries</p>
                </Card.Body>
              </Card>
            </Link>
          </Col>

        </Row>

        {/* RECENT ORDERS */}
        <Card className="admin-recent-orders-card">
          <Card.Body>

            <div className="admin-dashboard-card-header">
              <div>
                <p className="admin-dashboard-card-label">
                  ACTIVITY
                </p>

                <h2>Recent Orders</h2>
              </div>

              <Link
                to="/admin/orders"
                className="admin-dashboard-view-all"
              >
                View all →
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="admin-dashboard-empty">
                <p>No orders received yet.</p>
              </div>
            ) : (
              <div className="admin-recent-orders-list">
                {orders
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.orderDate).getTime() -
                      new Date(a.orderDate).getTime(),
                  )
                  .slice(0, 3)
                  .map((order) => (
                    <div
                      className="admin-recent-order-item"
                      key={order.orderId}
                    >

                      <div className="admin-recent-order-main">
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

                      <div className="admin-recent-order-details">

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
                                month: "short",
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

                    </div>
                  ))}
              </div>
            )}

          </Card.Body>
        </Card>

        {/* PRODUCT MANAGEMENT */}
        <Card className="admin-products-card">
          <Card.Body>

            <div>
              <p className="admin-dashboard-card-label">
                CATALOG
              </p>

              <h2>Product Management</h2>

              <p>
                Create, edit and manage the products available on OliveBridge.
              </p>
            </div>

            <Link
              to="/admin/products"
              className="admin-products-link"
            >
              Manage Products →
            </Link>

          </Card.Body>
        </Card>

      </Container>
    </main>
  )
}

export default AdminDashboard