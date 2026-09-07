import { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import type { SyntheticEvent } from "react"
import type { AccountType } from "../types/AccountType"
import type { RegisterRequest } from "../types/RegisterRequest"
import { registerAction } from "../redux/actions/userAction/register"

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [accountType, setAccountType] =
    useState<AccountType>("INDIVIDUAL")
  const [error, setError] = useState("")

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    setError("")

    const registerData: RegisterRequest = {
      name,
      surname,
      email,
      password,
      accountType,
    }

    try {
      await registerAction(registerData)

      navigate("/login")
    } catch {
      setError("Unable to create account. Please try again.")
    }
  }

  return (
    <Container className="py-5">
      <h1>Create your account</h1>

      {error && <p>{error}</p>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Surname</Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter your surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>

          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Account type</Form.Label>

          <Form.Select
            value={accountType}
            onChange={(e) =>
              setAccountType(e.target.value as AccountType)
            }
          >
            <option value="INDIVIDUAL">Individual</option>
            <option value="BUSINESS">Business</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit">Create Account</Button>
      </Form>
    </Container>
  )
}

export default Register