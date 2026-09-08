import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, Col, Container, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import type { AppDispatch, RootState } from "../redux/store"

import { getSampleRequests } from "../redux/actions/sampleRequestAction/getSampleRequests"
import { getProducts } from "../redux/actions/productAction/getProducts"

function SampleRequests() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser,
  )

  const sampleRequests = useSelector(
    (state: RootState) => state.sampleRequest.sampleRequests,
  )

  const products = useSelector(
    (state: RootState) => state.product.products,
  )

  const isBusiness = currentUser?.accountType === "BUSINESS"
  const isIndividual = currentUser?.accountType === "INDIVIDUAL"

  useEffect(() => {
    if (isBusiness) {
      dispatch(getSampleRequests())
    }
  }, [dispatch, isBusiness])

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

          <h1>Sample Requests</h1>

          <p>
            Request olive oil samples from our producers and keep
            track of your requests in one place.
          </p>

          <p className="sample-requests-notice">
            Please note: OliveBridge currently works exclusively with
            businesses based in Japan.
          </p>
        </div>

        {isIndividual && (
          <div className="sample-requests-business-cta">
            <p className="sample-requests-label">FOR BUSINESS</p>

            <h2>Interested in receiving product samples?</h2>

            <p>
              Sample requests are available exclusively to registered
              business accounts.
            </p>

            <p>
              Create a Business account to request samples from our
              producers and discover our olive oils for your business.
            </p>

            <button
              type="button"
              className="sample-requests-cta-button"
              onClick={() => navigate("/register")}
            >
              Create a Business account →
            </button>
          </div>
        )}

        {isBusiness && (
          <>
            <div className="sample-requests-cta">
              <div>
                <h2>Looking for a product to sample?</h2>

                <p>
                  Explore our olive oils and choose the product you'd
                  like to try.
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

                            <div className="sample-request-address">
                              <p className="sample-request-address-title">
                                Shipping address
                              </p>

                              <p>
                                <strong>
                                  {sampleRequest.recipientName}
                                </strong>
                              </p>

                              <p>
                                {sampleRequest.postalCode}{" "}
                                {sampleRequest.prefecture}
                              </p>

                              <p>
                                {sampleRequest.city},{" "}
                                {sampleRequest.area}
                              </p>

                              <p>
                                {sampleRequest.street}
                                {sampleRequest.building &&
                                  `, ${sampleRequest.building}`}
                              </p>
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
          </>
        )}
      </Container>
    </main>
  )
}

export default SampleRequests