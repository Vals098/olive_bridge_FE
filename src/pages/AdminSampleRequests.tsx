import { useEffect } from "react"
import { Card, Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import type { AppDispatch, RootState } from "../redux/store"
import { getAdminSampleRequests } from "../redux/actions/adminAction/getAdminSampleRequests"
import { getProducts } from "../redux/actions/productAction/getProducts"

function AdminSampleRequests() {
  const dispatch = useDispatch<AppDispatch>()

  const sampleRequests = useSelector(
    (state: RootState) => state.admin.sampleRequests,
  )

  const products = useSelector(
    (state: RootState) => state.product.products,
  )

  useEffect(() => {
    dispatch(getAdminSampleRequests())

    if (products.length === 0) {
      dispatch(getProducts())
    }
  }, [dispatch, products.length])

  return (
    <main className="admin-orders-page">
      <Container>

        <div className="admin-page-header">
          <p className="admin-dashboard-label">OLIVEBRIDGE</p>

          <h1>Sample Requests</h1>

          <p>
            Manage sample requests received from business customers.
          </p>
        </div>

        <Card className="admin-orders-card">
          <Card.Body>

            <div className="admin-orders-header">
              <div>
                <p className="admin-dashboard-card-label">
                  BUSINESS
                </p>

                <h2>All Sample Requests</h2>
              </div>

              <span className="admin-dashboard-count">
                {sampleRequests.length}
              </span>
            </div>

            {sampleRequests.length === 0 ? (
              <div className="admin-dashboard-empty">
                <p>No sample requests received yet.</p>
              </div>
            ) : (
              <div className="admin-orders-list">
                {sampleRequests.map((request) => (
                  <div
                    className="admin-order-item"
                    key={request.sampleRequestId}
                  >
                    <div className="admin-order-header">
                      <div>
                        <span className="admin-order-label">
                          PRODUCT
                        </span>

                        <h3>
                          {products.find(
                            (product) =>
                              product.productId === request.productId,
                          )?.name ?? "Product"}
                        </h3>
                      </div>

                      <span
                        className={`admin-order-status status-${request.status.toLowerCase()}`}
                      >
                        {request.status}
                      </span>
                    </div>

                    <div className="admin-order-info">

                      <div>
                        <span>Request date</span>

                        <strong>
                          {new Date(
                            request.createdAt,
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
                        <span>Request ID</span>

                        <strong>
                          #{request.sampleRequestId.slice(0, 8)}
                        </strong>
                      </div>

                      <div>
                        <span>Product ID</span>

                        <strong>
                          {request.productId}
                        </strong>
                      </div>

                    </div>

                    <div className="admin-order-footer">
                      <span>
                        {request.message}
                      </span>

                      <button type="button">
                        View request →
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

export default AdminSampleRequests