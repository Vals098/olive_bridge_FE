import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import type { AppDispatch, RootState } from "../redux/store"

import { getSampleRequests } from "../redux/actions/sampleRequestAction/getSampleRequests"
import { getProducts } from "../redux/actions/productAction/getProducts"

function SampleRequests() {
  const dispatch = useDispatch<AppDispatch>()

  const sampleRequests = useSelector(
    (state: RootState) => state.sampleRequest.sampleRequests,
  )

  const products = useSelector(
    (state: RootState) => state.product.products,
  )

  useEffect(() => {
    dispatch(getSampleRequests())
  }, [dispatch])

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts())
    }
  }, [dispatch, products.length])

  return (
    <main className="sample-requests-page">
      <Container>
        <div className="sample-requests-header">
          <p className="sample-requests-label">OLIVEBRIDGE</p>

          <h1>My Sample Requests</h1>

          <p>
            Keep track of the olive oil samples you have requested
            from OliveBridge.
          </p>

          <p className="sample-requests-notice">
            Please note: OliveBridge currently works exclusively with
            businesses based in Japan.
          </p>
        </div>

        <div className="sample-requests-cta">
          <div>
            <h2>Looking for a product to sample?</h2>

            <p>
              Explore our olive oils and choose the product you'd like
              to try.
            </p>
          </div>

          <Link
            to="/products"
            className="sample-requests-cta-button"
          >
            Explore Products →
          </Link>
        </div>

        <div className="sample-requests-list">
          {sampleRequests.length === 0 ? (
            <div className="sample-requests-empty">
              <div className="sample-requests-empty-icon">🫒</div>

              <h2>No sample requests yet</h2>

              <p>
                You haven't requested any samples yet.
              </p>
            </div>
          ) : (
            <Row className="g-4">
              {sampleRequests.map((sampleRequest) => {
                const product = products.find(
                  (product) =>
                    product.productId === sampleRequest.productId,
                )

                return (
                  <Col
                    md={6}
                    key={sampleRequest.sampleRequestId}
                  >
                    <Card className="sample-request-card h-100">
                      <Card.Body>
                        <div className="sample-request-top">
                          <div>
                            <p className="sample-request-label">
                              Sample Request
                            </p>

                            <h2>
                              {product?.name ?? "Product"}
                            </h2>
                          </div>

                          <span
                            className={`sample-request-status sample-request-status-${sampleRequest.status.toLowerCase()}`}
                          >
                            {sampleRequest.status}
                          </span>
                        </div>

                        <div className="sample-request-content">
                          <p>{sampleRequest.message}</p>
                        </div>

                        <div className="sample-request-date">
                          Requested on{" "}
                          {new Date(
                            sampleRequest.createdAt,
                          ).toLocaleDateString()}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          )}
        </div>
      </Container>
    </main>
  )
}

export default SampleRequests