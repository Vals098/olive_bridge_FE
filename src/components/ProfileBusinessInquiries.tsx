import { useEffect } from "react"
import { Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import type { AppDispatch, RootState } from "../redux/store"
import { getBusinessInquiries } from "../redux/actions/businessInquiryAction/getBusinessInquiries"

function ProfileBusinessInquiries() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const businessInquiries = useSelector(
    (state: RootState) => state.businessInquiry.businessInquiries,
  )

  useEffect(() => {
    dispatch(getBusinessInquiries())
  }, [dispatch])

  return (
    <Card className="profile-card profile-business-inquiries-card">
      <Card.Body>
        <div className="profile-business-inquiries-heading">
          <div>
            <div className="profile-section-label">
              BUSINESS INQUIRIES
            </div>

            <h2>My Business Inquiries</h2>

            <p className="profile-section-description">
              Keep track of your conversations and business opportunities
              with OliveBridge.
            </p>
          </div>

          <button
            type="button"
            className="profile-business-inquiry-button"
            onClick={() => navigate("/business-inquiries")}
          >
            + New Inquiry
          </button>
        </div>

        {businessInquiries.length === 0 ? (
          <div className="profile-empty-state">
            <div className="profile-empty-icon">✉</div>

            <h3>No inquiries yet</h3>

            <p>
              You haven't sent any business inquiries yet.
            </p>

            <button
              type="button"
              className="profile-business-inquiry-empty-button"
              onClick={() => navigate("/business-inquiries")}
            >
              Start a conversation →
            </button>
          </div>
        ) : (
          <div className="profile-business-inquiries-list">
            {businessInquiries.map((inquiry) => (
              <div
                className="profile-business-inquiry-item"
                key={inquiry.businessInquiryId}
              >
                <div className="profile-business-inquiry-header">
                  <div>
                    <span className="profile-order-label">
                      BUSINESS INQUIRY
                    </span>

                    <h3>{inquiry.subject}</h3>
                  </div>

                  <span
                    className={`profile-business-inquiry-status status-${inquiry.status.toLowerCase()}`}
                  >
                    {inquiry.status}
                  </span>
                </div>

                <div className="profile-business-inquiry-message">
                  <span>Message</span>

                  <p>{inquiry.message}</p>
                </div>

                <div className="profile-business-inquiry-footer">
                  <div>
                    <span>Sent on</span>

                    <strong>
                      {new Date(
                        inquiry.createdAt,
                      ).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </strong>
                  </div>

                  <div>
                    <span>Inquiry ID</span>

                    <strong>
                      #{inquiry.businessInquiryId.slice(0, 8)}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProfileBusinessInquiries