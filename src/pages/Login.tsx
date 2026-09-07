import { type SyntheticEvent, useState } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"

import type { AppDispatch } from "../redux/store"
import { loginAction } from "../redux/actions/userAction/login"

import AuthNavbar from "../components/AuthNavbar"

function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    await dispatch(
      loginAction({
        email,
        password,
      }),
    )

    const redirect = searchParams.get("redirect")

    navigate(redirect || "/")
  }

  return (
    <>
      <AuthNavbar />

      <main className="auth-page">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={7} lg={5} xl={4}>
              <Card className="auth-card">
                <Card.Body>
                  <div className="auth-header">
                    <p className="auth-label">OLIVEBRIDGE</p>

                    <h1>Welcome back</h1>

                    <p>Sign in to your account to continue.</p>
                  </div>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="loginEmail">
                      <Form.Label>Email</Form.Label>

                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="loginPassword">
                      <Form.Label>Password</Form.Label>

                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </Form.Group>

                    <Button type="submit" className="auth-button">
                      Login
                    </Button>
                  </Form>

                  <div className="auth-footer">
                    <p>Don't have an account?</p>

                    <Button
                      variant="link"
                      className="auth-link"
                      onClick={() => navigate("/register")}
                    >
                      Create an account
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

export default Login
