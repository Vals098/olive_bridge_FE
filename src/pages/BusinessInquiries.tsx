import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container } from "react-bootstrap"
import type { AppDispatch, RootState } from "../redux/store"
import { getBusinessInquiries } from "../redux/actions/businessInquiryAction/getBusinessInquiries"

function BusinessInquiries() {
  const dispatch = useDispatch<AppDispatch>()

  const businessInquiries = useSelector(
    (state: RootState) => state.businessInquiry.businessInquiries,
  )

  useEffect(() => {
    dispatch(getBusinessInquiries())
  }, [dispatch])

  return (
    <Container className="products-page">
      <h1>My Business Inquiries</h1>

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