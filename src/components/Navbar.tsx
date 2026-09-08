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
import { useLanguage } from "../context/LanguageContext"

function Navbar() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [navbarVisible, setNavbarVisible] = useState(true)

  const { language, setLanguage } = useLanguage()

  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser,
  )

  const cartItems = useSelector(
    (state: RootState) => state.cart.items,
  )

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  const handleLogout = () => {
    dispatch(logoutAction())
    navigate("/", { replace: true })
  }

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        setNavbarVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setNavbarVisible(true)
      }

      if (currentScrollY <= 10) {
        setNavbarVisible(true)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <BootstrapNavbar
      expand="md"
      className={`navbar ${
        navbarVisible
          ? "navbar-visible"
          : "navbar-hidden"
      }`}
    >
      <Container>
        <Link to="/" className="navbar-brand">
          OliveBridge
        </Link>

        <BootstrapNavbar.Toggle
          aria-controls="olivebridge-navbar"
          className="navbar-toggle"
        />

        <BootstrapNavbar.Collapse id="olivebridge-navbar">
          <Nav>
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>

            {currentUser?.role !== "ADMIN" && (
              <Nav.Link
                as={Link}
                to="/cart"
                className="navbar-cart-link"
              >
                <span className="navbar-cart-wrapper">
                  <span className="navbar-cart-icon">
                    🛒
                  </span>

                  <span className="navbar-cart-text">
                    Cart
                  </span>

                  {cartItemCount > 0 && (
                    <span className="navbar-cart-count">
                      {cartItemCount}
                    </span>
                  )}
                </span>
              </Nav.Link>
            )}

            {currentUser ? (
              <>
                {currentUser.role !== "ADMIN" && (
                  <Nav.Link
                    as={Link}
                    to="/favourites"
                    className="navbar-favourites-link"
                  >
                    <span className="navbar-favourites-icon">
                      ♥
                    </span>

                    <span className="navbar-favourites-text">
                      Favourites
                    </span>
                  </Nav.Link>
                )}

                {currentUser.accountType === "BUSINESS" && (
                  <Nav.Link
                    as={Link}
                    to="/business"
                  >
                    Business
                  </Nav.Link>
                )}

                <Nav.Link
                  as={Link}
                  to="/notifications"
                >
                  Notifications
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/profile"
                >
                  My Profile
                </Nav.Link>

                {currentUser.role === "ADMIN" && (
                  <Nav.Link
                    as={Link}
                    to="/admin"
                  >
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
              <button
                type="button"
                title="Italian"
                className={
                  language === "it"
                    ? "active"
                    : ""
                }
                onClick={() => setLanguage("it")}
              >
                ITA
              </button>

              <button
                type="button"
                title="English"
                className={
                  language === "en"
                    ? "active"
                    : ""
                }
                onClick={() => setLanguage("en")}
              >
                ENG
              </button>

              <button
                type="button"
                title="Japanese"
                className={
                  language === "ja"
                    ? "active"
                    : ""
                }
                onClick={() => setLanguage("ja")}
              >
                日本語
              </button>
            </div>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar