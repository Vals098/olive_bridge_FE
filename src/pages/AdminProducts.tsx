import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { SyntheticEvent } from "react"

import type { AppDispatch, RootState } from "../redux/store"
import type { Product } from "../types/Product"

import { getProducts } from "../redux/actions/productAction/getProducts"
import {
  createAdminProduct,
  type ProductRequest,
} from "../redux/actions/productAction/createAdminProduct"

import { getCategories } from "../redux/actions/categoryAction/getCategories"
import { getTechnicalInformations } from "../redux/actions/technicalInformationAction/getTechnicalInformations"

function AdminProducts() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const products = useSelector((state: RootState) => state.product.products)

  const categories = useSelector(
    (state: RootState) => state.category.categories,
  )

  const technicalInformations = useSelector(
    (state: RootState) => state.technicalInformation.technicalInformations,
  )

  const [formData, setFormData] = useState<ProductRequest>({
    name: "",
    description: "",
    image: "",
    status: "ACTIVE",
    categoryId: "",
    technicalInformationId: "",
  })

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts())
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

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()

    await dispatch(createAdminProduct(formData))

    setFormData({
      name: "",
      description: "",
      image: "",
      status: "ACTIVE",
      categoryId: "",
      technicalInformationId: "",
    })
  }

  return (
    <Container className="products-page">
      <h1>Manage Products</h1>

      {/* ADD PRODUCT */}

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Add Product</Card.Title>

          <Form onSubmit={handleSubmit}>
            {/* NAME */}

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>

              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* DESCRIPTION */}

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>

              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* IMAGE */}

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>

              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </Form.Group>

            {/* STATUS */}

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>

              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="ACTIVE">Active</option>

                <option value="INACTIVE">Inactive</option>
              </Form.Select>
            </Form.Group>

            {/* CATEGORY */}

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>

              <div className="d-flex gap-2">
                <Form.Select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose a category</option>

                  {categories.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.name}
                    </option>
                  ))}
                </Form.Select>

                <Button
                  type="button"
                  variant="outline-dark"
                  onClick={() => navigate("/admin/categories/new")}
                >
                  Add new
                </Button>
              </div>
            </Form.Group>

            {/* TECHNICAL INFORMATION */}

            <Form.Group className="mb-3">
              <Form.Label>Technical Information</Form.Label>

              <div className="d-flex gap-2">
                <Form.Select
                  name="technicalInformationId"
                  value={formData.technicalInformationId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose technical information</option>

                  {technicalInformations.map((technicalInformation) => (
                    <option
                      key={technicalInformation.technicalInformationId}
                      value={technicalInformation.technicalInformationId}
                    >
                      Harvest: {technicalInformation.harvestDate}
                      {" | "}
                      Acidity: {technicalInformation.acidity}
                      {" | "}
                      Peroxide: {technicalInformation.peroxideValue}
                    </option>
                  ))}
                </Form.Select>

                <Button
                  type="button"
                  variant="outline-dark"
                  onClick={() => navigate("/admin/technical-information/new")}
                >
                  Add new
                </Button>
              </div>
            </Form.Group>

            {/* SUBMIT */}

            <Button variant="dark" type="submit">
              Add Product
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* PRODUCT LIST */}

      <h2>Products</h2>

      <Row className="g-4">
        {products.map((product: Product) => (
          <Col md={6} lg={4} key={product.productId}>
            <Card className="h-100">
              {product.image && (
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                />
              )}

              <Card.Body>
                <Card.Title>{product.name}</Card.Title>

                <Card.Text>{product.description}</Card.Text>

                <p>
                  <strong>Status:</strong> {product.status}
                </p>

                <p>
                  <strong>Category:</strong> {product.category.name}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default AdminProducts
