import { useEffect } from "react"
import { Container, Card, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
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

  const products = useSelector((state: RootState) => state.product.products)

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
    <Container className="products-page">
      <h1>Admin Dashboard</h1>

      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Sample Requests</Card.Title>

              {sampleRequests.length === 0 ? (
                <p>No sample requests received.</p>
              ) : (
                sampleRequests.map((sampleRequest) => (
                  <div key={sampleRequest.sampleRequestId}>
                    <strong>Product:</strong>{" "}
                    {products.find(
                      (product) =>
                        product.productId === sampleRequest.productId,
                    )?.name ?? "Product"}
                    <p>
                      <strong>Message:</strong> {sampleRequest.message}
                    </p>
                    <p>
                      <strong>Status:</strong> {sampleRequest.status}
                    </p>
                    <p>
                      <strong>Date:</strong> {sampleRequest.createdAt}
                    </p>
                    <hr />
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Business Inquiries</Card.Title>

              {businessInquiries.length === 0 ? (
                <p>No business inquiries received.</p>
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminDashboard
