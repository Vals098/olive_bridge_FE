import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container } from "react-bootstrap"
import type { AppDispatch, RootState } from "../redux/store"
import { getSampleRequests } from "../redux/actions/sampleRequestAction/getSampleRequests"

function SampleRequests() {
  const dispatch = useDispatch<AppDispatch>()

  const sampleRequests = useSelector(
    (state: RootState) => state.sampleRequest.sampleRequests,
  )

  useEffect(() => {
    dispatch(getSampleRequests())
  }, [dispatch])

  return (
    <Container className="products-page">
      <h1>My Sample Requests</h1>

      {sampleRequests.length === 0 ? (
        <p>You haven't requested any samples yet.</p>
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

export default SampleRequests