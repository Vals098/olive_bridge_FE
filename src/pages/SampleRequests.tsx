import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap"
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom"

import type { AppDispatch, RootState } from "../redux/store"
import type { SampleRequestRequest } from "../types/SampleRequestRequest"

import { getSampleRequests } from "../redux/actions/sampleRequestAction/getSampleRequests"
import { createSampleRequest } from "../redux/actions/sampleRequestAction/createSampleRequest"

import { getProducts } from "../redux/actions/productAction/getProducts"
import { getAddresses } from "../redux/actions/addressAction/getAddresses"

function SampleRequests() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const productId = searchParams.get("productId")

  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser,
  )

  const sampleRequests = useSelector(
    (state: RootState) => state.sampleRequest.sampleRequests,
  )

  const products = useSelector(
    (state: RootState) => state.product.products,
  )

  const addresses = useSelector(
    (state: RootState) => state.address.addresses,
  )

  const isBusiness = currentUser?.accountType === "BUSINESS"
  const isIndividual = currentUser?.accountType === "INDIVIDUAL"

  const selectedProduct = products.find(
    (product) => product.productId === productId,
  )

  const [selectedAddressId, setSelectedAddressId] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isBusiness) {
      dispatch(getSampleRequests())
    }
  }, [dispatch, isBusiness])

  useEffect(() => {
    if (isBusiness) {
      dispatch(getAddresses())
    }
  }, [dispatch, isBusiness])

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts())
    }
  }, [dispatch, products.length])

  const selectedAddress = addresses.find(
    (address) => address.addressId === selectedAddressId,
  )

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    if (!selectedProduct) {
      setError("Please select a product first.")
      return
    }

    if (!selectedAddress) {
      setError("Please select a shipping address.")
      return
    }

    if (!message.trim()) {
      setError("Please enter a message.")
      return
    }

    const request: SampleRequestRequest = {
      productId: selectedProduct.productId,
      message: message.trim(),
      recipientName: selectedAddress.recipientName,
      postalCode: selectedAddress.postalCode,
      prefecture: selectedAddress.prefecture,
      city: selectedAddress.city,
      area: selectedAddress.area,
      street: selectedAddress.street,
      building: selectedAddress.building ?? "",
    }

    setIsSubmitting(true)

    try {
      await dispatch(createSampleRequest(request))

      setMessage("")
      setSelectedAddressId("")
      setSuccess(
        "Your sample request has been submitted successfully.",
      )

      dispatch(getSampleRequests())
    } catch {
      setError(
        "Unable to submit your sample request. Please try again.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

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
            Please note: OliveBridge currently works exclusively
            with businesses based in Japan.
          </p>
        </div>

        {isIndividual && (
          <div className="sample-requests-business-cta">
            <p className="sample-requests-label">FOR BUSINESS</p>

            <h2>Interested in receiving product samples?</h2>

            <p>
              Sample requests are available exclusively to
              registered business accounts.
            </p>

            <p>
              Create a Business account to request samples from our
              producers and discover our olive oils for your
              business.
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
            {selectedProduct && !success && (
              <div className="sample-request-form-section">
                <div className="sample-request-form-header">
                  <p className="sample-requests-label">
                    REQUEST A SAMPLE
                  </p>

                  <h2>Request a sample</h2>

                  <p>
                    You are requesting a sample of the following
                    product.
                  </p>
                </div>

                <Card className="sample-request-selected-product">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={3}>
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="sample-request-product-image"
                        />
                      </Col>

                      <Col md={9}>
                        <p className="sample-request-label">
                          Selected product
                        </p>

                        <h3>{selectedProduct.name}</h3>

                        <p>{selectedProduct.description}</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <Form
                  onSubmit={handleSubmit}
                  className="sample-request-form"
                >
                  <Form.Group className="mb-4">
                    <Form.Label>Shipping address</Form.Label>

                    {addresses.length === 0 ? (
                      <div className="sample-request-no-address">
                        <p>
                          You don't have any saved addresses yet.
                        </p>

                        <Button
                          type="button"
                          variant="outline-dark"
                          onClick={() => navigate("/addresses")}
                        >
                          Add an address
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Form.Select
                          value={selectedAddressId}
                          onChange={(event) =>
                            setSelectedAddressId(
                              event.target.value,
                            )
                          }
                        >
                          <option value="">
                            Select a saved address
                          </option>

                          {addresses.map((address) => (
                            <option
                              key={address.addressId}
                              value={address.addressId}
                            >
                              {address.label} —{" "}
                              {address.recipientName}
                            </option>
                          ))}
                        </Form.Select>

                        {selectedAddress && (
                          <div className="sample-request-selected-address">
                            <p>
                              <strong>
                                {selectedAddress.recipientName}
                              </strong>
                            </p>

                            <p>
                              {selectedAddress.postalCode}{" "}
                              {selectedAddress.prefecture}
                            </p>

                            <p>
                              {selectedAddress.city},{" "}
                              {selectedAddress.area}
                            </p>

                            <p>
                              {selectedAddress.street}
                              {selectedAddress.building &&
                                `, ${selectedAddress.building}`}
                            </p>
                          </div>
                        )}

                        <Button
                          type="button"
                          variant="link"
                          className="sample-request-address-link"
                          onClick={() => navigate("/addresses")}
                        >
                          Manage addresses
                        </Button>
                      </>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Message</Form.Label>

                    <Form.Control
                      as="textarea"
                      rows={5}
                      value={message}
                      onChange={(event) =>
                        setMessage(event.target.value)
                      }
                      placeholder="Tell us a little about your business and why you are interested in this product."
                    />
                  </Form.Group>

                  {error && (
                    <p className="sample-request-form-error">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="sample-request-submit-button"
                    disabled={
                      isSubmitting ||
                      addresses.length === 0 ||
                      !selectedProduct
                    }
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : "Submit request"}
                  </Button>
                </Form>
              </div>
            )}

            {success && (
              <div className="sample-request-success">
                <p className="sample-requests-label">OLIVEBRIDGE</p>

                <h2>Request submitted successfully</h2>

                <p>
                  Thank you for your interest. We'll get back to you
                  soon.
                </p>
              </div>
            )}

            <div className="sample-requests-cta">
              <div>
                <h2>Looking for a product to sample?</h2>

                <p>
                  Explore our olive oils and choose the product
                  you'd like to try.
                </p>
              </div>

              <Link
                to="/products"
                className="sample-requests-cta-button"
              >
                Explore Products →
              </Link>
            </div>

            <div className="sample-requests-list-header">
              <p className="sample-requests-label">OLIVEBRIDGE</p>

              <h2>My Sample Requests</h2>
            </div>

            <div className="sample-requests-list">
              {sampleRequests.length === 0 ? (
                <div className="sample-requests-empty">
                  <div className="sample-requests-empty-icon">
                    🫒
                  </div>

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
                        product.productId ===
                        sampleRequest.productId,
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