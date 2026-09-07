import { Link } from "react-router-dom"
import { Container } from "react-bootstrap"

function AuthNavbar() {
  return (
    <nav className="navbar">
      <Container>
        <Link to="/" className="navbar-brand">
          OliveBridge
        </Link>
      </Container>
    </nav>
  )
}

export default AuthNavbar