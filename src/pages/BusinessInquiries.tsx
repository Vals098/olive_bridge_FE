import { type SyntheticEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"

import { Container, Button } from "react-bootstrap"

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
        subject: subject,
        message: message,
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
    <Container className="products-page">
      <h1>My Business Inquiries</h1>

      <Button variant="dark" onClick={() => setShowForm(true)}>
        New Business Inquiry
      </Button>

      {showForm && (
        <form onSubmit={handleCreateInquiry}>
          <div>
            <label htmlFor="subject">Subject</label>

            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="message">Message</label>

            <textarea
              id="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />
          </div>

          <Button type="submit" variant="dark">
            Send Inquiry
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </Button>
        </form>
      )}

      {businessInquiries.length === 0 ? (
        <p>You haven't sent any business inquiries yet.</p>
      ) : (
        businessInquiries.map((inquiry) => (
          <div key={inquiry.businessInquiryId}>
            <p>
              <strong>Subject:</strong> {inquiry.subject}
            </p>

            <p>
              <strong>Message:</strong> {inquiry.message}
            </p>

            <p>
              <strong>Status:</strong> {inquiry.status}
            </p>

            <p>
              <strong>Date:</strong> {inquiry.createdAt}
            </p>

            <hr />
          </div>
        ))
      )}
    </Container>
  )
}

export default BusinessInquiries
