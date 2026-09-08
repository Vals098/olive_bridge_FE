import { useState } from "react"
import { Button, Card, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import type { SyntheticEvent } from "react"
import { API_URL } from "../api"

function AdminCategoryCreate() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("ACTIVE")

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()

    const token = localStorage.getItem("token")

    if (!token) return

    try {
      const response = await fetch(`${API_URL}/admin/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
          status,
        }),
      })

      if (!response.ok) {
        throw new Error("Unable to create category")
      }

      navigate("/admin/products")
    } catch (error) {
      console.error("Category creation error:", error)
    }
  }

  return (
    <Container className="products-page">
      <h1>Add New Category</h1>

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>

              <Form.Control
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>

              <Form.Control
                as="textarea"
                rows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>

              <Form.Select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="ACTIVE">Active</option>

                <option value="INACTIVE">Inactive</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="dark" type="submit">
                Add Category
              </Button>

              <Button
                variant="outline-dark"
                type="button"
                onClick={() => navigate("/admin/products")}
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

export default AdminCategoryCreate
