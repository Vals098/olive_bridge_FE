import { type SyntheticEvent, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import type { AppDispatch } from "../redux/store"
import { registerAction } from "../redux/actions/userAction/register"

import AuthNavbar from "../components/AuthNavbar"

function Register() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [accountType, setAccountType] = useState("INDIVIDUAL")
  const [error, setError] = useState("")

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setError("")

    try {
      await dispatch(
        registerAction({
          name,
          surname,
          email,
          password,
          accountType,
        }),
      )

      navigate("/login")
    } catch {
      setError("Unable to create your account. Please try again.")
    }
  }

  return (
    <>
      <AuthNavbar />

      <main className="auth-page">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={5}>
              <Card className="auth-card">
                <Card.Body>
                  <div className="auth-header">
                    <p className="auth-label">OLIVEBRIDGE</p>

                    <h1>Create your account</h1>

                    <p>
                      Join OliveBridge and discover authentic Italian olive
                      oil.
                    </p>
                  </div>

                  {error && (
                    <div className="auth-error">
                      {error}
                    </div>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group
                          className="mb-4"
                          controlId="registerName"
                        >
                          <Form.Label>Name</Form.Label>

                          <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group
                          className="mb-4"
                          controlId="registerSurname"
                        >
                          <Form.Label>Surname</Form.Label>

                          <Form.Control
                            type="text"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            placeholder="Enter your surname"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group
                      className="mb-4"
                      controlId="registerEmail"
                    >
                      <Form.Label>Email</Form.Label>

                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-4"
                      controlId="registerPassword"
                    >
                      <Form.Label>Password</Form.Label>

                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        required
                      />

                      <Form.Text>
                        Password must contain at least 8 characters.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group
                      className="mb-4"
                      controlId="registerAccountType"
                    >
                      <Form.Label>Account type</Form.Label>

                      <Form.Select
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                      >
                        <option value="INDIVIDUAL">
                          Individual
                        </option>

                        <option value="BUSINESS">
                          Business
                        </option>
                      </Form.Select>
                    </Form.Group>

                    <Button
                      type="submit"
                      className="auth-button"
                    >
                      Create Account
                    </Button>
                  </Form>

                  <div className="auth-footer">
                    <p>
                      Already have an account?
                    </p>

                    <Button
                      variant="link"
                      className="auth-link"
                      onClick={() => navigate("/login")}
                    >
                      Sign in
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default Register