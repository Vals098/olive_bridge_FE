import { useEffect, useState } from "react"
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import type { ChangeEvent, SyntheticEvent } from "react"

import type { AppDispatch, RootState } from "../redux/store"

import {
    createAdminProduct,
    type ProductRequest,
} from "../redux/actions/productAction/createAdminProduct"

import { getAdminProduct } from "../redux/actions/productAction/getAdminProduct"

import { updateAdminProduct } from "../redux/actions/productAction/updateAdminProduct"


function AdminProductForm() {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const { productId } = useParams()

    const isEditMode = Boolean(productId)


    const selectedProduct = useSelector(
        (state: RootState) => state.product.selectedProduct,
    )


    const categories = useSelector(
        (state: RootState) => state.category.categories,
    )


    const technicalInformations = useSelector(
        (state: RootState) =>
            state.technicalInformation.technicalInformations,
    )


    const [formData, setFormData] = useState<ProductRequest>({
        name: "",
        description: "",
        image: "",
        status: "ACTIVE",
        categoryId: "",
        technicalInformationId: "",
    })


    const [editedFields, setEditedFields] = useState<
        Partial<ProductRequest>
    >({})


    // GET product when editing
    useEffect(() => {

        if (isEditMode && productId) {
            dispatch(getAdminProduct(productId))
        }

    }, [dispatch, isEditMode, productId])


    // Data displayed inside the form
    const productFormData: ProductRequest | null =
        isEditMode &&
        selectedProduct &&
        selectedProduct.productId === productId
            ? {
                  name: selectedProduct.name,
                  description: selectedProduct.description,
                  image: selectedProduct.image ?? "",
                  status: selectedProduct.status,
                  categoryId:
                      selectedProduct.category.categoryId,
                  technicalInformationId:
                      selectedProduct.technicalInformation
                          .technicalInformationId,
                  ...editedFields,
              }
            : null


    const currentFormData =
        isEditMode
            ? productFormData
            : formData


    const handleChange = (
        event: ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >,
    ) => {

        if (isEditMode) {

            setEditedFields({
                ...editedFields,
                [event.target.name]: event.target.value,
            })

        } else {

            setFormData({
                ...formData,
                [event.target.name]: event.target.value,
            })

        }
    }


    const handleSubmit = async (event: SyntheticEvent) => {

        event.preventDefault()


        if (isEditMode && productId && currentFormData) {

            await dispatch(
                updateAdminProduct(
                    productId,
                    currentFormData,
                ),
            )

        } else {

            await dispatch(
                createAdminProduct(formData),
            )

        }


        navigate("/admin/products")
    }


    return (
        <Container className="products-page">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1 className="mb-0">
                    {isEditMode
                        ? "Edit Product"
                        : "Add Product"}
                </h1>


                <Button
                    variant="outline-dark"
                    onClick={() =>
                        navigate("/admin/products")
                    }
                >
                    Back
                </Button>

            </div>


            <Card>

                <Card.Body>

                    <Card.Title className="mb-4">

                        {isEditMode
                            ? "Edit Product"
                            : "Add Product"}

                    </Card.Title>


                    <Form onSubmit={handleSubmit}>

                        <Row>

                            {/* PRODUCT NAME */}

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>
                                        Product name
                                    </Form.Label>


                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={
                                            currentFormData?.name ?? ""
                                        }
                                        onChange={handleChange}
                                        required
                                    />

                                </Form.Group>

                            </Col>


                            {/* STATUS */}

                            <Col md={6}>

                                <Form.Group className="mb-3">

                                    <Form.Label>
                                        Status
                                    </Form.Label>


                                    <Form.Select
                                        name="status"
                                        value={
                                            currentFormData?.status ?? ""
                                        }
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="ACTIVE">
                                            Active
                                        </option>

                                        <option value="INACTIVE">
                                            Inactive
                                        </option>

                                    </Form.Select>

                                </Form.Group>

                            </Col>

                        </Row>


                        {/* DESCRIPTION */}

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Description
                            </Form.Label>


                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="description"
                                value={
                                    currentFormData?.description ?? ""
                                }
                                onChange={handleChange}
                                required
                            />

                        </Form.Group>


                        {/* IMAGE */}

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Image URL
                            </Form.Label>


                            <Form.Control
                                type="text"
                                name="image"
                                value={
                                    currentFormData?.image ?? ""
                                }
                                onChange={handleChange}
                            />

                        </Form.Group>


                        {/* CATEGORY */}

                        <Form.Group className="mb-3">

                            <Form.Label>
                                Category
                            </Form.Label>


                            <div className="d-flex gap-2">

                                <Form.Select
                                    name="categoryId"
                                    value={
                                        currentFormData?.categoryId ?? ""
                                    }
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
                                    variant="outline-dark"
                                    type="button"
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

                        <Form.Group className="mb-4">

                            <Form.Label>
                                Technical Information
                            </Form.Label>


                            <div className="d-flex gap-2">

                                <Form.Select
                                    name="technicalInformationId"
                                    value={
                                        currentFormData?.technicalInformationId ??
                                        ""
                                    }
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Choose technical information
                                    </option>


                                    {technicalInformations.map(
                                        (
                                            technicalInformation,
                                        ) => (
                                            <option
                                                key={
                                                    technicalInformation.technicalInformationId
                                                }
                                                value={
                                                    technicalInformation.technicalInformationId
                                                }
                                            >
                                                Acidity:{" "}
                                                {
                                                    technicalInformation.acidity
                                                }{" "}
                                                | Peroxide:{" "}
                                                {
                                                    technicalInformation.peroxideValue
                                                }{" "}
                                                | Harvest:{" "}
                                                {
                                                    technicalInformation.harvestDate
                                                }
                                            </option>
                                        ),
                                    )}

                                </Form.Select>


                                <Button
                                    variant="outline-dark"
                                    type="button"
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


                        {/* BUTTONS */}

                        <div className="d-flex gap-2">

                            <Button
                                variant="dark"
                                type="submit"
                            >
                                {isEditMode
                                    ? "Save Changes"
                                    : "Create Product"}
                            </Button>


                            <Button
                                variant="outline-secondary"
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/admin/products",
                                    )
                                }
                            >
                                Cancel
                            </Button>

                        </div>

                    </Form>

                </Card.Body>

            </Card>

        </Container>
    )
}


export default AdminProductForm