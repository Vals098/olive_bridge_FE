import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col } from "react-bootstrap"
import type { AppDispatch, RootState } from "../redux/store"
import { getProducts } from "../redux/actions/productAction/getProducts"
import ProductCard from "../components/ProductCard"

function Products() {
  const dispatch = useDispatch<AppDispatch>()

  const products = useSelector((state: RootState) => state.product.products)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  return (
    <Container className="products-page">
      <h1>Products</h1>

      <Row className="products-grid">
        {products.map((product) => (
          <Col key={product.productId} md={4} lg={3} className="d-flex">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Products
