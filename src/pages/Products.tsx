import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col } from "react-bootstrap"
import type { AppDispatch, RootState } from "../redux/store"
import { getProducts } from "../redux/actions/productAction/getProducts"
import ProductCard from "../components/ProductCard"

function Products() {
  const dispatch = useDispatch<AppDispatch>()

  const products = useSelector(
    (state: RootState) => state.product.products
  )

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <main className="products-page">

      <Container>

        <header className="products-header">
          <span className="products-eyebrow">
            OUR SELECTION
          </span>

          <h1>Discover Italian Olive Oil</h1>

          <p>
            Explore our selection of authentic Italian extra virgin
            olive oils, carefully selected from producers across Italy.
          </p>
        </header>

        <div className="products-toolbar">
          <span className="products-count">
            {products.length} PRODUCTS
          </span>
        </div>

        <Row className="products-grid g-4">
          {products.map((product) => (
            <Col
              key={product.productId}
              xs={12}
              sm={6}
              lg={4}
              xl={3}
              className="d-flex"
            >
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>

      </Container>

    </main>
  )
}

export default Products