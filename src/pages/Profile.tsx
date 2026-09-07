import { Container, Card, Row, Col, Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../redux/store"

function Profile() {
  const navigate = useNavigate()

  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser,
  )

  if (!currentUser) {
    return (
      <main className="profile-page">
        <Container>
          <div className="profile-empty">
            <p className="profile-label">OLIVEBRIDGE</p>
            <h1>My Profile</h1>
            <p>Please log in to view your profile.</p>
          </div>
        </Container>
      </main>
    )
  }

  return (
    <main className="profile-page">
      <Container>
        <div className="profile-header">
          <p className="profile-label">OLIVEBRIDGE</p>
          <h1>My Profile</h1>
          <p>Manage your personal information and account details.</p>
        </div>

        <Card className="profile-card">
          <Card.Body>
            <div className="profile-welcome">
              <div className="profile-avatar">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2>
                  {currentUser.name} {currentUser.surname}
                </h2>
                <p>{currentUser.email}</p>
              </div>
            </div>

            <div className="profile-divider" />

            <Row className="g-4">
              <Col md={6}>
                <div className="profile-info">
                  <span>Name</span>
                  <strong>{currentUser.name}</strong>
                </div>
              </Col>

              <Col md={6}>
                <div className="profile-info">
                  <span>Surname</span>
                  <strong>{currentUser.surname}</strong>
                </div>
              </Col>

              <Col md={12}>
                <div className="profile-info">
                  <span>Email</span>
                  <strong>{currentUser.email}</strong>
                </div>
              </Col>

              <Col md={6}>
                <div className="profile-info">
                  <span>Account type</span>
                  <strong>{currentUser.accountType}</strong>
                </div>
              </Col>

              <Col md={6}>
                <div className="profile-info">
                  <span>Role</span>
                  <strong>{currentUser.role}</strong>
                </div>
              </Col>

              <Col md={12}>
                <div className="profile-info">
                  <span>Account status</span>
                  <strong>{currentUser.status}</strong>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="profile-card profile-address-card">
          <Card.Body>
            <div className="profile-address-content">
              <div>
                <span className="profile-section-label">MY ADDRESSES</span>

                <h2>Saved addresses</h2>

                <p>
                  Manage your shipping addresses and add new ones for your
                  orders.
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
      </Container>
    </main>
  )
}

export default Profile