import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import type { SyntheticEvent, ChangeEvent } from "react"
import type { AddressRequest } from "../types/AddressRequest"

interface AddressFormProps {
  initialData: AddressRequest
  onSubmit: (data: AddressRequest) => void
  submitLabel: string
}

function AddressForm({
  initialData,
  onSubmit,
  submitLabel,
}: AddressFormProps) {
  const [formData, setFormData] = useState<AddressRequest>(initialData)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Form onSubmit={handleSubmit} className="mt-4">
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Label</Form.Label>
            <Form.Control
              type="text"
              name="label"
              value={formData.label}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Recipient name</Form.Label>
            <Form.Control
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Postal code</Form.Label>
            <Form.Control
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Prefecture</Form.Label>
            <Form.Control
              type="text"
              name="prefecture"
              value={formData.prefecture}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Area</Form.Label>
        <Form.Control
          type="text"
          name="area"
          value={formData.area}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Street</Form.Label>
        <Form.Control
          type="text"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Building</Form.Label>
        <Form.Control
          type="text"
          name="building"
          value={formData.building}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit">{submitLabel}</Button>
    </Form>
  )
}

export default AddressForm