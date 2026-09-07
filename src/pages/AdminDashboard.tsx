import { useEffect } from "react"
import { Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { getAdminSampleRequests } from "../redux/actions/adminAction/getAdminSampleRequests"

function AdminDashboard() {
  const dispatch = useDispatch<AppDispatch>()

  const sampleRequests = useSelector(
    (state: RootState) => state.admin.sampleRequests,
  )

  useEffect(() => {
    dispatch(getAdminSampleRequests())
  }, [dispatch])

  return (
    <Container className="products-page">
      <h1>Admin Dashboard</h1>

      <h2>Sample Requests</h2>

      {sampleRequests.length === 0 ? (
        <p>No sample requests received.</p>
      ) : (
        sampleRequests.map((sampleRequest) => (
          <div key={sampleRequest.sampleRequestId}>
            <p>
              <strong>Product:</strong> {sampleRequest.productId}
            </p>

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
    </Container>
  )
}

export default AdminDashboard