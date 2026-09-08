import { useEffect, useState } from "react"
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

  const [navbarVisible, setNavbarVisible] = useState(true)

  const currentUser = useSelector((state: RootState) => state.user.currentUser)

  const cartItems = useSelector((state: RootState) => state.cart.items)

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  const handleLogout = () => {
    dispatch(logoutAction())
    navigate("/", { replace: true })
  }

  // SHOW NAVBAR WHEN SCROLLING UP
  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Sempre visibile in cima
      if (currentScrollY <= 10) {
        setNavbarVisible(true)
        lastScrollY = currentScrollY
        return
      }

      // Scorrimento verso il basso
      if (currentScrollY > lastScrollY) {
        setNavbarVisible(false)
      }

      // Scorrimento verso l'alto
      else if (currentScrollY < lastScrollY) {
        setNavbarVisible(true)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <BootstrapNavbar
      expand="md"
      className={`navbar ${navbarVisible ? "navbar-visible" : "navbar-hidden"}`}
    >
      <Container>
        {/* LOGO */}

        <Link to="/" className="navbar-brand">
          OliveBridge
        </Link>

        {/* MOBILE TOGGLE */}

        <BootstrapNavbar.Toggle
          aria-controls="olivebridge-navbar"
          className="navbar-toggle"
        />

        {/* NAVIGATION */}

        <BootstrapNavbar.Collapse id="olivebridge-navbar">
          <Nav>
            {/* PRODUCTS */}

            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>

            {/* CART */}

            {currentUser?.role !== "ADMIN" && (
              <Nav.Link as={Link} to="/cart" className="navbar-cart-link">
                <span className="navbar-cart-wrapper">
                  <span className="navbar-cart-icon">🛒</span>

                  <span className="navbar-cart-text">Cart</span>

                  {cartItemCount > 0 && (
                    <span className="navbar-cart-count">{cartItemCount}</span>
                  )}
                </span>
              </Nav.Link>
            )}

            {currentUser ? (
              <>
                {/* FAVOURITES */}

                {currentUser.role !== "ADMIN" && (
                  <Nav.Link
                    as={Link}
                    to="/favourites"
                    className="navbar-favourites-link"
                  >
                    <span className="navbar-favourites-icon">♥</span>

                    <span className="navbar-favourites-text">Favourites</span>
                  </Nav.Link>
                )}

                {/* BUSINESS */}

                {currentUser.accountType === "BUSINESS" && (
                  <Nav.Link as={Link} to="/business">
                    Business
                  </Nav.Link>
                )}

                {/* NOTIFICATIONS */}

                <Nav.Link as={Link} to="/notifications">
                  Notifications
                </Nav.Link>

                {/* PROFILE */}

                <Nav.Link as={Link} to="/profile">
                  My Profile
                </Nav.Link>

                {/* ADMIN */}

                {currentUser.role === "ADMIN" && (
                  <Nav.Link as={Link} to="/admin">
                    Admin
                  </Nav.Link>
                )}

                {/* WELCOME */}

                <span className="navbar-welcome">
                  Welcome, {currentUser.name}!
                </span>

                {/* LOGOUT */}

                <Button className="navbar-button" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* LOGIN */}

                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>

                {/* REGISTER */}

                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}

            {/* LANGUAGES */}

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
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar
