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

  const orders = useSelector((state: RootState) => state.admin.orders)

  const products = useSelector((state: RootState) => state.product.products)

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

  console.log("ADMIN PRODUCTS:", products)

  return (
    <main className="admin-dashboard-page">
      <Container>
        {/* HEADER */}
        <div className="admin-dashboard-header">
          <p className="admin-dashboard-label">OLIVEBRIDGE</p>

          <h1>Admin Dashboard</h1>

          <p>
            Manage business requests and keep track of OliveBridge activity.
          </p>
        </div>

        {/* OVERVIEW */}
        <Row className="g-4 admin-dashboard-overview">
          <Col md={6} lg={3}>
            <Link to="/admin/orders" className="admin-overview-link">
              <Card className="admin-overview-card h-100">
                <Card.Body>
                  <p className="admin-dashboard-card-label">ORDERS</p>

                  <h2>{orders.length}</h2>

                  <p>Total orders received</p>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={6} lg={3}>
            <Link to="/admin/products" className="admin-overview-link">
              <Card className="admin-overview-card h-100">
                <Card.Body>
                  <p className="admin-dashboard-card-label">PRODUCTS</p>

                  <h2>{products.length}</h2>

                  <p>Products in catalog</p>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={6} lg={3}>
            <Link to="/admin/sample-requests" className="admin-overview-link">
              <Card className="admin-overview-card h-100">
                <Card.Body>
                  <p className="admin-dashboard-card-label">SAMPLE REQUESTS</p>

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
                  <p className="admin-dashboard-card-label">INQUIRIES</p>

                  <h2>{businessInquiries.length}</h2>

                  <p>Business inquiries</p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>

        {/* SAMPLE REQUESTS + BUSINESS INQUIRIES */}
        <Row className="g-4">
          <Col md={6}>
            <Card className="admin-dashboard-card h-100">
              <Card.Body>
                <div className="admin-dashboard-card-header">
                  <div>
                    <p className="admin-dashboard-card-label">BUSINESS</p>

                    <h2>Sample Requests</h2>
                  </div>

                  <span className="admin-dashboard-count">
                    {sampleRequests.length}
                  </span>
                </div>

                {sampleRequests.length === 0 ? (
                  <div className="admin-dashboard-empty">
                    <p>No sample requests received.</p>
                  </div>
                ) : (
                  <div className="admin-dashboard-list">
                    {sampleRequests.map((sr) => (
                      <div
                        className="admin-dashboard-item"
                        key={sr.sampleRequestId}
                      >
                        <div className="admin-dashboard-item-top">
                          <h3>
                            {products.find((p) => p.productId === sr.productId)
                              ?.name ?? "Product"}
                          </h3>

                          <span className="admin-dashboard-status">
                            {sr.status}
                          </span>
                        </div>

                        <p className="admin-dashboard-message">{sr.message}</p>

                        <p className="admin-dashboard-date">
                          Requested on{" "}
                          {new Date(sr.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="admin-dashboard-card h-100">
              <Card.Body>
                <div className="admin-dashboard-card-header">
                  <div>
                    <p className="admin-dashboard-card-label">BUSINESS</p>

                    <h2>Business Inquiries</h2>
                  </div>

                  <span className="admin-dashboard-count">
                    {businessInquiries.length}
                  </span>
                </div>

                {businessInquiries.length === 0 ? (
                  <div className="admin-dashboard-empty">
                    <p>No business inquiries received.</p>
                  </div>
                ) : (
                  <div className="admin-dashboard-list">
                    {businessInquiries.map((inquiry) => (
                      <div
                        className="admin-dashboard-item"
                        key={inquiry.businessInquiryId}
                      >
                        <div className="admin-dashboard-item-top">
                          <h3>{inquiry.subject}</h3>

                          <span className="admin-dashboard-status">
                            {inquiry.status}
                          </span>
                        </div>

                        <p className="admin-dashboard-message">
                          {inquiry.message}
                        </p>

                        <p className="admin-dashboard-date">
                          Received on{" "}
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* PRODUCT MANAGEMENT */}
        <Card className="admin-products-card">
          <Card.Body>
            <div>
              <p className="admin-dashboard-card-label">CATALOG</p>

              <h2>Product Management</h2>

              <p>
                Create, edit and manage the products available on OliveBridge.
              </p>
            </div>

            <Link to="/admin/products" className="admin-products-link">
              Manage Products →
            </Link>
          </Card.Body>
        </Card>
      </Container>
    </main>
  )
}

export default AdminDashboard
