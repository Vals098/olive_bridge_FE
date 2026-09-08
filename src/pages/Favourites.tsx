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
    <Container className="favourites-page">
      <div className="favourites-header">
        <span className="favourites-eyebrow">
          YOUR SELECTION
        </span>

        <h1>My Favourites</h1>

        <p>
          A collection of the oils you have chosen to keep close.
        </p>
      </div>

      {favouriteProducts.length === 0 ? (
        <div className="favourites-empty">
          <div className="favourites-empty-icon">♥</div>

          <h2>No favourites yet</h2>

          <p>
            Explore our selection and save the products
            you would like to discover again.
          </p>
        </div>
      ) : (
        <>
          <div className="favourites-count">
            {favouriteProducts.length}{" "}
            {favouriteProducts.length === 1
              ? "product"
              : "products"}
          </div>

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
        </>
      )}
    </Container>
  )
}

export default Favourites