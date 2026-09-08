import { Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function ProfileAddresses() {
  const navigate = useNavigate()

  return (
    <Card className="profile-card profile-address-card">
      <Card.Body>
        <div className="profile-address-content">
          <div>
            <span className="profile-section-label">
              MY ADDRESSES
            </span>

            <h2>Saved addresses</h2>

            <p>
              Manage your shipping addresses and add new ones for
              your orders.
            </p>
          </div>

          <Button
            className="profile-address-button"
            onClick={() => navigate("/addresses")}
          >
            Manage Addresses
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProfileAddresses