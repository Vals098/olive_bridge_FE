import { type SyntheticEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"

import { Container, Button, Card, Form } from "react-bootstrap"

import { getBusinessInquiries } from "../redux/actions/businessInquiryAction/getBusinessInquiries"
import { createBusinessInquiry } from "../redux/actions/businessInquiryAction/createBusinessInquiry"

function BusinessInquiries() {
  const dispatch = useDispatch<AppDispatch>()

  const [showForm, setShowForm] = useState(false)
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const businessInquiries = useSelector(
    (state: RootState) => state.businessInquiry.businessInquiries,
  )

  const handleCreateInquiry = (event: SyntheticEvent) => {
    event.preventDefault()

    dispatch(
      createBusinessInquiry({
        subject,
        message,
      }),
    )

    setSubject("")
    setMessage("")
    setShowForm(false)
  }

  useEffect(() => {
    dispatch(getBusinessInquiries())
  }, [dispatch])

  return (
    <main className="business-inquiries-page">
      <Container>
        <div className="business-inquiries-header">
          <p className="business-inquiries-label">OLIVEBRIDGE</p>

          <h1>My Business Inquiries</h1>

          <p>
            Keep track of your conversations and business opportunities with
            OliveBridge.
          </p>

          <p className="business-inquiries-notice">
            Please note: OliveBridge currently works exclusively with businesses
            based in Japan.
          </p>
        </div>

        <div className="business-inquiries-action">
          <Button
            className="business-inquiries-button"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "− Close Inquiry Form" : "+ New Business Inquiry"}
          </Button>
        </div>

        {showForm && (
          <Card className="business-inquiry-form-card">
            <Card.Body>
              <div className="business-inquiry-form-header">
                <h2>New Business Inquiry</h2>

                <p>Tell us how we can help with your business needs.</p>
              </div>

              <Form onSubmit={handleCreateInquiry}>
                <Form.Group className="mb-4" controlId="businessInquirySubject">
                  <Form.Label>Subject</Form.Label>

                  <Form.Control
                    type="text"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="What would you like to discuss?"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="businessInquiryMessage">
                  <Form.Label>Message</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </Form.Group>

                <div className="business-inquiry-form-actions">
                  <Button type="submit" className="business-inquiries-button">
                    Send Inquiry
                  </Button>

                  <Button
                    type="button"
                    variant="outline-dark"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        )}

        <div className="business-inquiries-list">
          {businessInquiries.length === 0 ? (
            <div className="business-inquiries-empty">
              <div className="business-inquiries-empty-icon">✉</div>

              <h2>No inquiries yet</h2>

              <p>You haven't sent any business inquiries yet.</p>
            </div>
          ) : (
            businessInquiries.map((inquiry) => (
              <Card
                className="business-inquiry-card"
                key={inquiry.businessInquiryId}
              >
                <Card.Body>
                  <div className="business-inquiry-top">
                    <div>
                      <p className="business-inquiry-label">Business Inquiry</p>

                      <h2>{inquiry.subject}</h2>
                    </div>

                    <span
                      className={`business-inquiry-status business-inquiry-status-${inquiry.status.toLowerCase()}`}
                    >
                      {inquiry.status}
                    </span>
                  </div>

                  <div className="business-inquiry-content">
                    <p>{inquiry.message}</p>
                  </div>

                  <div className="business-inquiry-date">
                    Sent on {new Date(inquiry.createdAt).toLocaleDateString()}
                  </div>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      </Container>
    </main>
  )
}

export default BusinessInquiries
