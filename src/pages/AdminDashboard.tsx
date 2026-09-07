import { useEffect } from "react"
import { Container, Card, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import type { AppDispatch, RootState } from "../redux/store"

import { getAdminSampleRequests } from "../redux/actions/adminAction/getAdminSampleRequests"
import { getAdminBusinessInquiries } from "../redux/actions/adminAction/getAdminBusinessInquiries"
import { getProducts } from "../redux/actions/productAction/getProducts"

function AdminDashboard() {
  const dispatch = useDispatch<AppDispatch>()

  const sampleRequests = useSelector(
    (state: RootState) => state.admin.sampleRequests,
  )

  const businessInquiries = useSelector(
    (state: RootState) => state.admin.businessInquiries,
  )

  const products = useSelector(
    (state: RootState) => state.product.products,
  )

  useEffect(() => {
    dispatch(getAdminSampleRequests())
    dispatch(getAdminBusinessInquiries())
  }, [dispatch])

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts())
    }
  }, [dispatch, products.length])

  return (
    <main className="admin-dashboard-page">
      <Container>
        <div className="admin-dashboard-header">
          <p className="admin-dashboard-label">OLIVEBRIDGE</p>

          <h1>Admin Dashboard</h1>

          <p>
            Manage business requests and keep track of OliveBridge
            activity.
          </p>
        </div>

        <Row className="g-4">
          <Col md={6}>
            <Card className="admin-dashboard-card h-100">
              <Card.Body>
                <div className="admin-dashboard-card-header">
                  <div>
                    <p className="admin-dashboard-card-label">
                      BUSINESS
                    </p>

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
                    {sampleRequests.map((sampleRequest) => (
                      <div
                        className="admin-dashboard-item"
                        key={sampleRequest.sampleRequestId}
                      >
                        <div className="admin-dashboard-item-top">
                          <h3>
                            {products.find(
                              (product) =>
                                product.productId ===
                                sampleRequest.productId,
                            )?.name ?? "Product"}
                          </h3>

                          <span className="admin-dashboard-status">
                            {sampleRequest.status}
                          </span>
                        </div>

                        <p className="admin-dashboard-message">
                          {sampleRequest.message}
                        </p>

                        <p className="admin-dashboard-date">
                          Requested on{" "}
                          {new Date(
                            sampleRequest.createdAt,
                          ).toLocaleDateString()}
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
                    <p className="admin-dashboard-card-label">
                      BUSINESS
                    </p>

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
                          {new Date(
                            inquiry.createdAt,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="admin-products-card">
          <Card.Body>
            <div>
              <p className="admin-dashboard-card-label">
                CATALOG
              </p>

              <h2>Product Management</h2>

              <p>
                Create, edit and manage the products available
                on OliveBridge.
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