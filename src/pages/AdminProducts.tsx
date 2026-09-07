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

    const products = useSelector(
        (state: RootState) => state.product.products,
    )

    const categories = useSelector(
        (state: RootState) => state.category.categories,
    )

    const technicalInformations = useSelector(
        (state: RootState) =>
            state.technicalInformation.technicalInformations,
    )

    const [showAddForm, setShowAddForm] = useState(false)

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
    }, [
        dispatch,
        categories.length,
        technicalInformations.length,
    ])

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
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

        setShowAddForm(false)
    }

    const handleCancel = () => {
        setFormData({
            name: "",
            description: "",
            image: "",
            status: "ACTIVE",
            categoryId: "",
            technicalInformationId: "",
        })

        setShowAddForm(false)
    }

    return (
        <Container className="products-page">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1 className="mb-0">
                    Manage Products
                </h1>

                <Button
                    variant="dark"
                    onClick={() =>
                        setShowAddForm(!showAddForm)
                    }
                >
                    {showAddForm
                        ? "Close"
                        : "+ Add Product"}
                </Button>

            </div>

            {/* ADD PRODUCT FORM */}

            {showAddForm && (
                <Card className="mb-5">
                    <Card.Body>

                        <Card.Title>
                            Add Product
                        </Card.Title>

                        <Form onSubmit={handleSubmit}>

                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Name
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Description
                                </Form.Label>

                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Image URL
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Status
                                </Form.Label>

                                <Form.Select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="ACTIVE">
                                        Active
                                    </option>

                                    <option value="INACTIVE">
                                        Inactive
                                    </option>
                                </Form.Select>
                            </Form.Group>

                            {/* CATEGORY */}

                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Category
                                </Form.Label>

                                <div className="d-flex gap-2">

                                    <Form.Select
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">
                                            Choose a category
                                        </option>

                                        {categories.map(
                                            (category) => (
                                                <option
                                                    key={
                                                        category.categoryId
                                                    }
                                                    value={
                                                        category.categoryId
                                                    }
                                                >
                                                    {category.name}
                                                </option>
                                            ),
                                        )}
                                    </Form.Select>

                                    <Button
                                        type="button"
                                        variant="outline-dark"
                                        onClick={() =>
                                            navigate(
                                                "/admin/categories/new",
                                            )
                                        }
                                    >
                                        Add new
                                    </Button>

                                </div>
                            </Form.Group>

                            {/* TECHNICAL INFORMATION */}

                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Technical Information
                                </Form.Label>

                                <div className="d-flex gap-2">

                                    <Form.Select
                                        name="technicalInformationId"
                                        value={
                                            formData.technicalInformationId
                                        }
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">
                                            Choose technical information
                                        </option>

                                        {technicalInformations.map(
                                            (technicalInformation) => (
                                                <option
                                                    key={
                                                        technicalInformation.technicalInformationId
                                                    }
                                                    value={
                                                        technicalInformation.technicalInformationId
                                                    }
                                                >
                                                    Harvest:{" "}
                                                    {
                                                        technicalInformation.harvestDate
                                                    }
                                                    {" | "}
                                                    Acidity:{" "}
                                                    {
                                                        technicalInformation.acidity
                                                    }
                                                    {" | "}
                                                    Peroxide:{" "}
                                                    {
                                                        technicalInformation.peroxideValue
                                                    }
                                                </option>
                                            ),
                                        )}
                                    </Form.Select>

                                    <Button
                                        type="button"
                                        variant="outline-dark"
                                        onClick={() =>
                                            navigate(
                                                "/admin/technical-information/new",
                                            )
                                        }
                                    >
                                        Add new
                                    </Button>

                                </div>
                            </Form.Group>

                            <div className="d-flex gap-2">

                                <Button
                                    variant="dark"
                                    type="submit"
                                >
                                    Add Product
                                </Button>

                                <Button
                                    variant="outline-dark"
                                    type="button"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>

                            </div>

                        </Form>

                    </Card.Body>
                </Card>
            )}

            {/* PRODUCTS */}

            <h2 className="mb-4">
                Products
            </h2>

            <Row className="g-4">

                {products.map((product: Product) => (

                    <Col
                        md={6}
                        lg={4}
                        xl={3}
                        key={product.productId}
                    >

                        <Card className="h-100 product-card">

                            {/* IMAGE */}

                            <div className="position-relative">

                                {product.image ? (
                                    <Card.Img
                                        variant="top"
                                        src={product.image}
                                        alt={product.name}
                                    />
                                ) : (
                                    <div className="product-card-placeholder">
                                        No image
                                    </div>
                                )}

                                {/* EDIT BUTTON */}

                                <button
                                    type="button"
                                    className="product-card-edit"
                                    onClick={() =>
                                        console.log(
                                            "Edit product:",
                                            product.productId,
                                        )
                                    }
                                    aria-label={`Edit ${product.name}`}
                                    title="Edit product"
                                >
                                    ✎
                                </button>

                            </div>

                            <Card.Body>

                                <Card.Title>
                                    {product.name}
                                </Card.Title>

                                <Card.Text>
                                    {product.description}
                                </Card.Text>

                                <p className="mb-1">
                                    <strong>
                                        Category:
                                    </strong>{" "}
                                    {product.category.name}
                                </p>

                                <p className="mb-0">
                                    <strong>
                                        Status:
                                    </strong>{" "}
                                    {product.status}
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