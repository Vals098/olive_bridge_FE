import { useEffect } from "react"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import type { AppDispatch, RootState } from "../redux/store"
import type { Product } from "../types/Product"

import { getAdminProducts } from "../redux/actions/productAction/getAdminProducts"
import { getCategories } from "../redux/actions/categoryAction/getCategories"
import { getTechnicalInformations } from "../redux/actions/technicalInformationAction/getTechnicalInformations"
import { deleteAdminProduct } from "../redux/actions/productAction/deleteAdminProduct"
import { activateAdminProduct } from "../redux/actions/productAction/activateAdminProduct"

function AdminProducts() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const products = useSelector(
    (state: RootState) => state.product.adminProducts,
  )

  const categories = useSelector(
    (state: RootState) => state.category.categories,
  )

  const technicalInformations = useSelector(
    (state: RootState) => state.technicalInformation.technicalInformations,
  )

  const handleDeactivate = (productId: string) => {
    dispatch(deleteAdminProduct(productId))
  }

  const handleActivate = (productId: string) => {
    dispatch(activateAdminProduct(productId))
  }

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAdminProducts())
    }
  }, [dispatch, products.length])

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories())
    }

    if (technicalInformations.length === 0) {
      dispatch(getTechnicalInformations())
    }
  }, [dispatch, categories.length, technicalInformations.length])

  return (
    <Container className="products-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Manage Products</h1>

        <Button variant="dark" onClick={() => navigate("/admin/products/new")}>
          + Add Product
        </Button>
      </div>

      <h2 className="mb-4">Products</h2>

      <Row className="g-4">
        {products.map((product: Product) => (
          <Col md={6} lg={4} xl={3} key={product.productId}>
            <Card className="h-100 product-card">
              <div className="position-relative">
                {product.image ? (
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                  />
                ) : (
                  <div className="product-card-placeholder">No image</div>
                )}

                <button
                  type="button"
                  className="product-card-edit"
                  onClick={() =>
                    navigate(`/admin/products/edit/${product.productId}`)
                  }
                  aria-label={`Edit ${product.name}`}
                  title="Edit product"
                >
                  ✎
                </button>
              </div>

              <Card.Body>
                <Card.Title>{product.name}</Card.Title>

                <Card.Text>{product.description}</Card.Text>

                <p className="mb-1">
                  <strong>Category:</strong> {product.category.name}
                </p>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <p className="mb-0">
                    <strong>Status:</strong> {product.status}
                  </p>

                  {product.status === "ACTIVE" ? (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeactivate(product.productId)}
                    >
                      Deactivate
                    </Button>
                  ) : (
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleActivate(product.productId)}
                    >
                      Activate
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default AdminProducts
