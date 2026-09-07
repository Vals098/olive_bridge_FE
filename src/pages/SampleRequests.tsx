import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container } from "react-bootstrap"
import type { AppDispatch, RootState } from "../redux/store"
import { getSampleRequests } from "../redux/actions/sampleRequestAction/getSampleRequests"
import { getProducts } from "../redux/actions/productAction/getProducts"

function SampleRequests() {
  const dispatch = useDispatch<AppDispatch>()

  const sampleRequests = useSelector(
    (state: RootState) => state.sampleRequest.sampleRequests,
  )

  const products = useSelector((state: RootState) => state.product.products)

  useEffect(() => {
    dispatch(getSampleRequests())
  }, [dispatch])

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts())
    }
  }, [dispatch, products.length])

  return (
    <Container className="products-page">
      <h1>My Sample Requests</h1>

      {sampleRequests.length === 0 ? (
        <p>You haven't requested any samples yet.</p>
      ) : (
        sampleRequests.map((sampleRequest) => (
          <div key={sampleRequest.sampleRequestId}>
            <p>
              <strong>Product:</strong>{" "}
              {products.find(
                (product) => product.productId === sampleRequest.productId,
              )?.name ?? "Product"}
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
