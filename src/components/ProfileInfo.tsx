import { useState, type SyntheticEvent } from "react"
import { Col, Button, Form, Row } from "react-bootstrap"
import { useDispatch } from "react-redux"

import type { AppDispatch } from "../redux/store"
import type { User } from "../types/User"
import type { UpdateUserRequest } from "../types/UpdateUserRequest"
import { updateCurrentUser } from "../redux/actions/userAction/updateCurrentUser"

interface ProfileInfoProps {
  currentUser: User
}

function ProfileInfo({ currentUser }: ProfileInfoProps) {
  const dispatch = useDispatch<AppDispatch>()

  const [isEditing, setIsEditing] = useState(false)

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [businessName, setBusinessName] = useState("")
  const [businessTaxId, setBusinessTaxId] = useState("")

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

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
    <>
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
    </>
  )
}

export default ProfileInfo