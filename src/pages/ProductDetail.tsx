import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"
import type { Product } from "../types/Product"
import { useDispatch } from "react-redux"
import { getProductVariants } from "../redux/actions/productAction/getProductVariants"
import type { RootState, AppDispatch } from "../redux/store"
import { addToCartAction } from "../redux/actions/cartAction/addToCart"
import { useSelector } from "react-redux"
import type { ProductVariant } from "../types/ProductVariant"

function ProductDetail() {
  const { productId } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const variants = useSelector(
    (state: RootState) => state.productVariant.variants,
  )
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  )

const handleAddToCart = () => {
  if (product && selectedVariant) {
    dispatch(
      addToCartAction({
        product: product,
        variant: selectedVariant,
        quantity: 1,
      }),
    )
  }
}

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/products/${productId}`,
        )

        if (!response.ok) {
          throw new Error("Unable to retrieve product")
        }

        const product: Product = await response.json()
        setProduct(product)
      } catch (error) {
        console.error("Product retrieval error:", error)
      }
    }

    getProduct()
  }, [productId])

  useEffect(() => {
    if (productId) {
      dispatch(getProductVariants(productId))
    }
  }, [productId, dispatch])

  if (!product) {
    return <p>Loading...</p>
  }

  return (
    <Container className="product-detail-page">
      <Row className="align-items-center">
        <Col md={6}>
          <img
            src={product.image}
            alt={product.name}
            className="product-detail-image"
          />
        </Col>

        <Col md={6} className="product-detail-info">
          <p className="product-detail-category">{product.category.name}</p>

          <h1>{product.name}</h1>

          <p className="product-detail-description">{product.description}</p>

          <div className="product-variants">
            <p>
              <strong>Format:</strong>
            </p>

            <div>
              {variants.map((variant) => (
                <Button
                  key={variant.productVariantId}
                  variant={
                    selectedVariant?.productVariantId ===
                    variant.productVariantId
                      ? "dark"
                      : "outline-dark"
                  }
                  onClick={() => setSelectedVariant(variant)}
                >
                  {variant.format} — €{variant.price.toFixed(2)}
                </Button>
              ))}
            </div>
          </div>

          <Button className="product-detail-button" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </Col>
      </Row>

      <Row className="product-detail-technical">
        <Col>
          <h2>Technical information</h2>

          <div className="technical-info">
            <p>
              <strong>Acidity:</strong> {product.technicalInformation.acidity}
            </p>

            <p>
              <strong>Peroxide value:</strong>{" "}
              {product.technicalInformation.peroxideValue}
            </p>

            <p>
              <strong>Harvest date:</strong>{" "}
              {product.technicalInformation.harvestDate}
            </p>

            <p>
              <strong>Best before:</strong>{" "}
              {product.technicalInformation.bestBeforeDate}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetail
