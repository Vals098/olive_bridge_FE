import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col } from "react-bootstrap"
import type { AppDispatch, RootState } from "../redux/store"
import { getProducts } from "../redux/actions/productAction/getProducts"
import ProductCard from "../components/ProductCard"

function Favourites() {
  const dispatch = useDispatch<AppDispatch>()

  const favourites = useSelector(
    (state: RootState) => state.favourite.favourites,
  )

  const products = useSelector(
    (state: RootState) => state.product.products,
  )

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts())
    }
  }, [dispatch, products.length])

  const favouriteProducts = products.filter((product) =>
    favourites.some(
      (favourite) => favourite.productId === product.productId,
    ),
  )

  return (
    <Container className="products-page">
      <h1>My Favourites</h1>

      {favouriteProducts.length === 0 ? (
        <p>You don't have any favourite products yet.</p>
      ) : (
        <Row className="products-grid">
          {favouriteProducts.map((product) => (
            <Col
              key={product.productId}
              md={4}
              lg={3}
              className="d-flex"
            >
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default Favourites