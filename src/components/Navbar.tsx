import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { logoutAction } from "../redux/actions/userAction/logout"
import { Link, useNavigate } from "react-router-dom"
import {
  Navbar as BootstrapNavbar,
  Container,
  Nav,
  Button,
} from "react-bootstrap"

function Navbar() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser,
  )

  const handleLogout = () => {
    dispatch(logoutAction())
    navigate("/", { replace: true })
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

          <Nav.Link as={Link} to="/cart">
            Cart
          </Nav.Link>

          {currentUser ? (
            <>
              <Nav.Link as={Link} to="/favourites">
                ♥ Favourites
              </Nav.Link>

              {currentUser.accountType === "BUSINESS" && (
                <Nav.Link as={Link} to="/business">
                  Business
                </Nav.Link>
              )}

              <Nav.Link as={Link} to="/notifications">
                Notifications
              </Nav.Link>

              <Nav.Link as={Link} to="/profile">
                My Profile
              </Nav.Link>

              {currentUser.role === "ADMIN" && (
                <Nav.Link as={Link} to="/admin">
                  Admin
                </Nav.Link>
              )}

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

          <div className="navbar-languages">
            <button type="button" title="Italian">
              ITA
            </button>

            <button type="button" title="English">
              ENG
            </button>

            <button type="button" title="Japanese">
              JAP
            </button>
          </div>
        </Nav>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar