import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { logoutAction } from "../redux/actions/userAction/logout"
import { Link } from "react-router-dom"
import { Navbar as BootstrapNavbar, Container, Nav, Button } from "react-bootstrap"

function Navbar() {
  const dispatch = useDispatch<AppDispatch>()

  const currentUser = useSelector((state: RootState) => state.user.currentUser)

  const handleLogout = () => {
    dispatch(logoutAction())
  }

  return (
    <BootstrapNavbar className="navbar">
      <Container>
        <Link to="/" className="navbar-brand">
          OliveBridge
        </Link>

        <Nav>
          <Nav.Link as={Link} to="/products">
            Products
          </Nav.Link>

          {currentUser ? (
            <>
              <span className="navbar-welcome">
                Welcome, {currentUser.name}!
              </span>

              <Button
                className="navbar-button"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>

              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar