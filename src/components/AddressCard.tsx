import { Button, Card } from "react-bootstrap"
import type { Address } from "../types/Address"

interface AddressCardProps {
  address: Address
  onEdit: () => void
  onDelete: () => void
}

function AddressCard({
  address,
  onEdit,
  onDelete,
}: AddressCardProps) {
  return (
    <Card className="address-card h-100">
      <Card.Body>
        <div className="address-card-header">
          <span className="address-card-label">{address.label}</span>
        </div>

        <div className="address-card-content">
          <strong>{address.recipientName}</strong>

          <p>
            {address.postalCode} {address.city}
          </p>

          <p>
            {address.prefecture}, {address.area}
          </p>

          <p>{address.street}</p>

          {address.building && <p>{address.building}</p>}
        </div>

        <div className="address-card-actions">
          <Button
            variant="outline-secondary"
            onClick={onEdit}
          >
            Edit
          </Button>

          <Button
            variant="outline-danger"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default AddressCard