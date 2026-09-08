import { useState } from "react"
import { Button, Card, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import type { SyntheticEvent } from "react"
import { API_URL } from "../api"

function AdminTechnicalInformationCreate() {
  const navigate = useNavigate()

  const [acidity, setAcidity] = useState("")
  const [peroxideValue, setPeroxideValue] = useState("")
  const [harvestDate, setHarvestDate] = useState("")
  const [bestBeforeDate, setBestBeforeDate] = useState("")

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()

    const token = localStorage.getItem("token")

    if (!token) return

    try {
      const response = await fetch(`${API_URL}/admin/technical-information`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          acidity: Number(acidity),
          peroxideValue: Number(peroxideValue),
          harvestDate,
          bestBeforeDate,
        }),
      })

      if (!response.ok) {
        throw new Error("Unable to create technical information")
      }

      navigate("/admin/products")
    } catch (error) {
      console.error("Technical information creation error:", error)
    }
  }

  return (
    <Container className="products-page">
      <h1>Add Technical Information</h1>

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Acidity</Form.Label>

              <Form.Control
                type="number"
                step="0.01"
                value={acidity}
                onChange={(event) => setAcidity(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Peroxide Value</Form.Label>

              <Form.Control
                type="number"
                step="0.01"
                value={peroxideValue}
                onChange={(event) => setPeroxideValue(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Harvest Date</Form.Label>

              <Form.Control
                type="date"
                value={harvestDate}
                onChange={(event) => setHarvestDate(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Best Before Date</Form.Label>

              <Form.Control
                type="date"
                value={bestBeforeDate}
                onChange={(event) => setBestBeforeDate(event.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="dark" type="submit">
                Add Technical Information
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

export default AdminTechnicalInformationCreate
