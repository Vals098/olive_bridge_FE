import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Row, Col, Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import type { Product } from "../types/Product"
import type { ProductVariant } from "../types/ProductVariant"
import type { RootState, AppDispatch } from "../redux/store"

import { getProductVariants } from "../redux/actions/productAction/getProductVariants"
import { addToCartAction } from "../redux/actions/cartAction/addToCart"
import { API_URL } from "../api"

function ProductDetail() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const currentUser = useSelector((state: RootState) => state.user.currentUser)

  const variants = useSelector(
    (state: RootState) => state.productVariant.variants,
  )

  const [product, setProduct] = useState<Product | null>(null)

  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariant | null>(null)

  const [variantError, setVariantError] = useState("")

  const [showCartModal, setShowCartModal] = useState(false)

  const handleAddToCart = () => {
    if (!product || !selectedVariant) {
      setVariantError("Please select a format first.")
      return
    }

    setVariantError("")

    dispatch(
      addToCartAction({
        product: product,
        variant: selectedVariant,
        quantity: 1,
      }),
    )

    setSelectedVariant(null)
    setShowCartModal(true)
  }

  const handleSampleRequest = () => {
    if (!product) return

    navigate(`/sample-requests?productId=${product.productId}`)
  }

  const handleContinueShopping = () => {
    setShowCartModal(false)
  }

  const handleGoToCart = () => {
    setShowCartModal(false)
    navigate("/cart")
  }

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(
          `${API_URL}/products/${productId}`,
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
    <>
      <Container className="product-detail-page">
        <Row className="align-items-center">
          <Col md={6}>
            <img
              src="/public/images/product-default.png"
              alt={product.name}
              className="product-detail-image"
            />
          </Col>

          <Col md={6} className="product-detail-info">
            <p className="product-detail-category">{product.category.name}</p>

            <h1>{product.name}</h1>

            <p className="product-detail-description">
              {product.description}
            </p>

            <div className="product-variants">
              <p>
                <strong>Format:</strong>
              </p>

              <div className="product-variant-options">
                {variants.map((variant) => (
                  <Button
                    key={variant.productVariantId}
                    className="product-variant-button"
                    variant={
                      selectedVariant?.productVariantId ===
                      variant.productVariantId
                        ? "dark"
                        : "outline-dark"
                    }
                    onClick={() => {
                      setSelectedVariant(variant)
                      setVariantError("")
                    }}
                  >
                    {variant.format} — €{variant.price.toFixed(2)}
                  </Button>
                ))}
              </div>

              {variantError && (
                <p className="product-detail-variant-error">
                  {variantError}
                </p>
              )}
            </div>

            <div className="product-detail-actions">
              <Button
                className="product-detail-button"
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>

              {currentUser?.accountType === "BUSINESS" && (
                <Button
                  className="product-detail-button product-detail-sample-button"
                  onClick={handleSampleRequest}
                >
                  Request a sample
                </Button>
              )}
            </div>
          </Col>
        </Row>

        <Row className="product-detail-technical">
          <Col>
            <h2>Technical information</h2>

            <div className="technical-info">
              <p>
                <strong>Acidity:</strong>{" "}
                {product.technicalInformation.acidity}
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

        {currentUser?.accountType === "INDIVIDUAL" && (
          <Row className="product-detail-business-cta">
            <Col>
              <div className="business-cta-content">
                <p className="business-cta-label">FOR BUSINESS</p>

                <h2>Are you a business interested in this product?</h2>

                <p>
                  Request a sample and discover this olive oil for your
                  business.
                </p>

                <Button
                  className="product-detail-business-button"
                  onClick={handleSampleRequest}
                >
                  Request a sample →
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Container>

      <Modal
        show={showCartModal}
        onHide={() => setShowCartModal(false)}
        centered
        className="cart-added-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Product added to cart!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="cart-added-product">
            <img
              src="/public/images/product-default.png"
              alt={product.name}
              className="cart-added-product-image"
            />

            <div>
              <h3>{product.name}</h3>

              <p>{product.description}</p>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className="cart-modal-shopping-button"
            onClick={handleContinueShopping}
          >
            Continue shopping
          </Button>

          <Button
            className="cart-modal-cart-button"
            onClick={handleGoToCart}
          >
            Go to cart →
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProductDetail