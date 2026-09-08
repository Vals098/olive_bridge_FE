import { useState, type SyntheticEvent } from "react"
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import type { AppDispatch, RootState } from "../redux/store"
import type { UpdateUserRequest } from "../types/UpdateUserRequest"
import { updateCurrentUser } from "../redux/actions/userAction/updateCurrentUser"

function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser,
  )

  const [isEditing, setIsEditing] = useState(false)

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [businessTaxId, setBusinessTaxId] = useState("")

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

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

  const handleEdit = () => {
    setName(currentUser.name)
    setSurname(currentUser.surname)
    setEmail(currentUser.email)
    setBusinessName(currentUser.businessName ?? "")
    setBusinessTaxId(currentUser.businessTaxId ?? "")

    setError("")
    setSuccess("")
    setIsEditing(true)
  }

  const handleCancel = () => {
    setError("")
    setSuccess("")
    setIsEditing(false)
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    setError("")
    setSuccess("")

    const data: UpdateUserRequest = {
      name,
      surname,
      email,
      businessName:
        currentUser.accountType === "BUSINESS"
          ? businessName
          : null,
      businessTaxId:
        currentUser.accountType === "BUSINESS"
          ? businessTaxId
          : null,
    }

    try {
      await dispatch(updateCurrentUser(data))

      setSuccess("Your profile has been updated successfully.")
      setIsEditing(false)
    } catch {
      setError("Unable to update your profile. Please try again.")
    }
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

            {error && (
              <div className="auth-error mb-4">
                {error}
              </div>
            )}

            {success && (
              <div className="profile-success mb-4">
                {success}
              </div>
            )}

            {!isEditing ? (
              <>
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

                  {currentUser.accountType === "BUSINESS" && (
                    <>
                      <Col md={6}>
                        <div className="profile-info">
                          <span>Business name</span>
                          <strong>{currentUser.businessName}</strong>
                        </div>
                      </Col>

                      <Col md={12}>
                        <div className="profile-info">
                          <span>
                            Business Tax ID / Registration Number
                          </span>
                          <strong>{currentUser.businessTaxId}</strong>
                        </div>
                      </Col>
                    </>
                  )}

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

                <div className="profile-actions">
                  <Button
                    className="profile-address-button"
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </Button>
                </div>
              </>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Row className="g-4">
                  <Col md={6}>
                    <Form.Group controlId="profileName">
                      <Form.Label>Name</Form.Label>

                      <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="profileSurname">
                      <Form.Label>Surname</Form.Label>

                      <Form.Control
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group controlId="profileEmail">
                      <Form.Label>Email</Form.Label>

                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  {currentUser.accountType === "BUSINESS" && (
                    <>
                      <Col md={6}>
                        <Form.Group controlId="profileBusinessName">
                          <Form.Label>Business name</Form.Label>

                          <Form.Control
                            type="text"
                            value={businessName}
                            onChange={(e) =>
                              setBusinessName(e.target.value)
                            }
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group controlId="profileBusinessTaxId">
                          <Form.Label>
                            Business Tax ID / Registration Number
                          </Form.Label>

                          <Form.Control
                            type="text"
                            value={businessTaxId}
                            onChange={(e) =>
                              setBusinessTaxId(e.target.value)
                            }
                            required
                          />
                        </Form.Group>
                      </Col>
                    </>
                  )}

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

                <div className="profile-actions">
                  <Button
                    type="submit"
                    className="profile-address-button"
                  >
                    Save Changes
                  </Button>

                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
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