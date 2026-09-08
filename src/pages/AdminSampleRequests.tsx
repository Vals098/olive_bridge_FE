import { useEffect, useState } from "react"
import { Alert, Button, Card, Container, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import type { AppDispatch, RootState } from "../redux/store"

import { getAdminSampleRequests } from "../redux/actions/adminAction/getAdminSampleRequests"
import { updateAdminSampleRequestStatus } from "../redux/actions/adminAction/updateAdminSampleRequestStatus"
import { replyAdminSampleRequest } from "../redux/actions/adminAction/replyAdminSampleRequest"
import { getProducts } from "../redux/actions/productAction/getProducts"

const STATUSES = ["PENDING", "APPROVED", "REJECTED", "SHIPPED", "COMPLETED"]

function AdminSampleRequests() {
  const dispatch = useDispatch<AppDispatch>()

  const sampleRequests = useSelector(
    (state: RootState) => state.admin.sampleRequests,
  )

  const products = useSelector((state: RootState) => state.product.products)

  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null,
  )

  const [replyMessage, setReplyMessage] = useState("")
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [replySent, setReplySent] = useState(false)
  const [sendingReply, setSendingReply] = useState(false)

  useEffect(() => {
    dispatch(getAdminSampleRequests())

    if (products.length === 0) {
      dispatch(getProducts())
    }
  }, [dispatch, products.length])

  const getProductName = (productId: string) => {
    const product = products.find((product) => product.productId === productId)

    return product?.name ?? "Product"
  }

  const getAvailableStatuses = (currentStatus: string) => {
    switch (currentStatus) {
      case "PENDING":
        return ["PENDING", "APPROVED", "REJECTED"]

      case "APPROVED":
        return ["APPROVED", "SHIPPED"]

      case "REJECTED":
        return ["REJECTED"]

      case "SHIPPED":
        return ["SHIPPED", "COMPLETED"]

      case "COMPLETED":
        return ["COMPLETED"]

      default:
        return [currentStatus]
    }
  }

  const handleStatusChange = async (
    sampleRequestId: string,
    status: string,
  ) => {
    try {
      await dispatch(updateAdminSampleRequestStatus(sampleRequestId, status))
    } catch (error) {
      console.error("Unable to update sample request status:", error)
    }
  }

  const handleOpenReply = (sampleRequestId: string) => {
    setSelectedRequestId(sampleRequestId)
    setReplyMessage("")
    setReplySent(false)
    setShowReplyModal(true)
  }

  const handleCloseReply = () => {
    if (sendingReply) return

    setShowReplyModal(false)
    setSelectedRequestId(null)
    setReplyMessage("")
    setReplySent(false)
  }

  const handleSendReply = async () => {
    if (!selectedRequestId || !replyMessage.trim()) {
      return
    }

    setSendingReply(true)
    setReplySent(false)

    try {
      await dispatch(replyAdminSampleRequest(selectedRequestId, replyMessage))

      setReplySent(true)
      setReplyMessage("")
    } catch (error) {
      console.error("Unable to send sample request reply:", error)
    } finally {
      setSendingReply(false)
    }
  }

  const selectedRequest = sampleRequests.find(
    (request) => request.sampleRequestId === selectedRequestId,
  )

  return (
    <main className="admin-orders-page">
      <Container>
        {/* HEADER */}

        <div className="admin-page-header">
          <p className="admin-dashboard-label">OLIVEBRIDGE</p>

          <h1>Sample Requests</h1>

          <p>Manage sample requests received from business customers.</p>
        </div>

        {/* REQUESTS CARD */}

        <Card className="admin-orders-card">
          <Card.Body>
            <div className="admin-orders-header">
              <div>
                <p className="admin-dashboard-card-label">BUSINESS</p>

                <h2>All Sample Requests</h2>
              </div>

              <span className="admin-dashboard-count">
                {sampleRequests.length}
              </span>
            </div>

            {/* EMPTY STATE */}

            {sampleRequests.length === 0 ? (
              <div className="admin-dashboard-empty">
                <p>No sample requests received yet.</p>
              </div>
            ) : (
              /* REQUEST LIST */

              <div className="admin-orders-list">
                {sampleRequests.map((request) => {
                  const availableStatuses = getAvailableStatuses(request.status)

                  return (
                    <div
                      className="admin-order-item"
                      key={request.sampleRequestId}
                    >
                      {/* REQUEST HEADER */}

                      <div className="admin-order-header">
                        <div>
                          <span className="admin-order-label">PRODUCT</span>

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

                      {/* REQUEST INFO */}

                      <div className="admin-order-info">
                        <div>
                          <span>Request date</span>

                          <strong>
                            {new Date(request.createdAt).toLocaleDateString(
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
                          <span>Product</span>

                          <strong>{getProductName(request.productId)}</strong>
                        </div>
                      </div>

                      {/* CUSTOMER MESSAGE */}

                      <div className="admin-sample-request-section">
                        <span>Customer message</span>

                        <p>{request.message}</p>
                      </div>

                      {/* SHIPPING ADDRESS */}

                      <div className="admin-sample-request-section">
                        <span>Shipping address</span>

                        <p>
                          <strong>{request.recipientName}</strong>
                          <br />
                          {request.postalCode}, {request.prefecture},{" "}
                          {request.city}, {request.area}
                          <br />
                          {request.street}
                          {request.building && <>, {request.building}</>}
                        </p>
                      </div>

                      {/* STATUS MANAGEMENT */}

                      <div className="admin-sample-request-section">
                        <span>Update status</span>

                        <div className="admin-sample-request-status-buttons">
                          {STATUSES.map((status) => {
                            const isAvailable =
                              availableStatuses.includes(status)

                            const isCurrent = request.status === status

                            return (
                              <Button
                                key={status}
                                className={`admin-status-button ${
                                  isCurrent ? "active" : ""
                                }`}
                                disabled={!isAvailable || isCurrent}
                                onClick={() =>
                                  handleStatusChange(
                                    request.sampleRequestId,
                                    status,
                                  )
                                }
                              >
                                {status}
                              </Button>
                            )
                          })}
                        </div>
                      </div>

                      {/* ACTIONS */}

                      <div className="admin-order-footer">
                        <span>
                          Manage this sample request or contact the customer.
                        </span>

                        <Button
                          className="admin-reply-button"
                          onClick={() =>
                            handleOpenReply(request.sampleRequestId)
                          }
                        >
                          Reply →
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>

      {/* REPLY MODAL */}

      <Modal show={showReplyModal} onHide={handleCloseReply} centered>
        <Modal.Header closeButton={!sendingReply}>
          <Modal.Title>Reply to Sample Request</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedRequest && (
            <div className="admin-reply-context">
              <span>PRODUCT</span>

              <strong>{getProductName(selectedRequest.productId)}</strong>
            </div>
          )}

          {replySent && (
            <Alert variant="success">Reply sent successfully.</Alert>
          )}

          <label htmlFor="sample-request-reply" className="admin-reply-label">
            Message
          </label>

          <textarea
            id="sample-request-reply"
            className="admin-reply-textarea"
            value={replyMessage}
            onChange={(event) => setReplyMessage(event.target.value)}
            placeholder="Write your reply..."
            rows={6}
            disabled={sendingReply}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="light"
            onClick={handleCloseReply}
            disabled={sendingReply}
          >
            Cancel
          </Button>

          <Button
            className="admin-reply-button"
            onClick={handleSendReply}
            disabled={sendingReply || !replyMessage.trim()}
          >
            {sendingReply ? "Sending..." : "Send Reply"}
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  )
}

export default AdminSampleRequests
