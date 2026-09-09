import { useEffect } from "react"
import { Card, Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import type { AppDispatch, RootState } from "../redux/store"
import { getAdminBusinessInquiries } from "../redux/actions/adminAction/getAdminBusinessInquiries"

function AdminBusinessInquiries() {
  const dispatch = useDispatch<AppDispatch>()

  const businessInquiries = useSelector(
    (state: RootState) => state.admin.businessInquiries,
  )

  useEffect(() => {
    dispatch(getAdminBusinessInquiries())
  }, [dispatch])

  const sortedBusinessInquiries = [...businessInquiries].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime(),
  )

  return (
    <main className="admin-orders-page">
      <Container>

        <div className="admin-page-header">
          <p className="admin-dashboard-label">OLIVEBRIDGE</p>

          <h1>Business Inquiries</h1>

          <p>
            Manage inquiries received from business customers.
          </p>
        </div>

        <Card className="admin-orders-card">
          <Card.Body>

            <div className="admin-orders-header">
              <div>
                <p className="admin-dashboard-card-label">
                  BUSINESS
                </p>

                <h2>All Business Inquiries</h2>
              </div>

              <span className="admin-dashboard-count">
                {businessInquiries.length}
              </span>
            </div>

            {businessInquiries.length === 0 ? (
              <div className="admin-dashboard-empty">
                <p>No business inquiries received yet.</p>
              </div>
            ) : (
              <div className="admin-orders-list">
                {sortedBusinessInquiries.map((inquiry) => (
                  <div
                    className="admin-order-item"
                    key={inquiry.businessInquiryId}
                  >

                    <div className="admin-order-header">
                      <div>
                        <span className="admin-order-label">
                          SUBJECT
                        </span>

                        <h3>{inquiry.subject}</h3>
                      </div>

                      <span
                        className={`admin-order-status status-${inquiry.status.toLowerCase()}`}
                      >
                        {inquiry.status}
                      </span>
                    </div>

                    <div className="admin-order-info">

                      <div>
                        <span>Received</span>

                        <strong>
                          {new Date(
                            inquiry.createdAt,
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
                        <span>Inquiry ID</span>

                        <strong>
                          #{inquiry.businessInquiryId.slice(0, 8)}
                        </strong>
                      </div>

                    </div>

                    <div className="admin-order-footer">
                      <span>
                        {inquiry.message}
                      </span>

                      <button type="button">
                        View inquiry →
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

export default AdminBusinessInquiries