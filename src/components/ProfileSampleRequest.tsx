import { useEffect } from "react"
import { Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import type { AppDispatch, RootState } from "../redux/store"
import { getSampleRequests } from "../redux/actions/sampleRequestAction/getSampleRequests"
import { getProducts } from "../redux/actions/productAction/getProducts"

function ProfileSampleRequests() {
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
    <Card className="profile-card profile-sample-requests-card">
      <Card.Body>
        <div className="profile-section-label">SAMPLE REQUESTS</div>

        <h2>My Sample Requests</h2>

        <p className="profile-section-description">
          Keep track of the olive oil samples you have requested.
        </p>

        {sampleRequests.length === 0 ? (
          <div className="profile-empty-state">
            <div className="profile-empty-icon">🫒</div>

            <h3>No sample requests yet</h3>

            <p>
              You haven't requested any samples yet.
            </p>
          </div>
        ) : (
          <div className="profile-sample-requests-list">
            {sampleRequests.map((sampleRequest) => {
              const product = products.find(
                (product) =>
                  product.productId === sampleRequest.productId,
              )

              return (
                <div
                  className="profile-sample-request-item"
                  key={sampleRequest.sampleRequestId}
                >
                  <div className="profile-sample-request-header">
                    <div>
                      <span className="profile-order-label">
                        SAMPLE REQUEST
                      </span>

                      <h3>
                        {product?.name ?? "Product"}
                      </h3>
                    </div>

                    <span
                      className={`profile-sample-request-status status-${sampleRequest.status.toLowerCase()}`}
                    >
                      {sampleRequest.status}
                    </span>
                  </div>

                  <div className="profile-sample-request-message">
                    <span>Message</span>

                    <p>{sampleRequest.message}</p>
                  </div>

                  <div className="profile-sample-request-info">
                    <div>
                      <span>Requested on</span>

                      <strong>
                        {new Date(
                          sampleRequest.createdAt,
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </strong>
                    </div>

                    <div>
                      <span>Request ID</span>

                      <strong>
                        #{sampleRequest.sampleRequestId.slice(0, 8)}
                      </strong>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProfileSampleRequests