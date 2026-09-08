import { useState } from "react"
import { Container, Card, Button } from "react-bootstrap"
import { useSelector } from "react-redux"

import type { RootState } from "../redux/store"

import ProfileInfo from "../components/ProfileInfo"
import ProfileAddresses from "../components/ProfileAddresses"
import ProfileOrders from "../components/ProfileOrders"
import ProfileSampleRequests from "../components/ProfileSampleRequest"
import ProfileBusinessInquiries from "../components/ProfileBusinessInquiries"

type ProfileSection =
  | "profile"
  | "addresses"
  | "orders"
  | "sample-requests"
  | "business-inquiries"

function Profile() {
  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser,
  )

  const [activeSection, setActiveSection] =
    useState<ProfileSection>("profile")

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

  return (
    <main className="profile-page">
      <Container>
        <div className="profile-header">
          <p className="profile-label">OLIVEBRIDGE</p>

          <h1>My Profile</h1>

          <p>
            Manage your personal information and account details.
          </p>
        </div>

        <div className="profile-navigation">
          <Button
            className={
              activeSection === "profile"
                ? "profile-navigation-button active"
                : "profile-navigation-button"
            }
            onClick={() => setActiveSection("profile")}
          >
            Profile
          </Button>

          <Button
            className={
              activeSection === "addresses"
                ? "profile-navigation-button active"
                : "profile-navigation-button"
            }
            onClick={() => setActiveSection("addresses")}
          >
            Addresses
          </Button>

          <Button
            className={
              activeSection === "orders"
                ? "profile-navigation-button active"
                : "profile-navigation-button"
            }
            onClick={() => setActiveSection("orders")}
          >
            Orders
          </Button>

          <Button
            className={
              activeSection === "sample-requests"
                ? "profile-navigation-button active"
                : "profile-navigation-button"
            }
            onClick={() => setActiveSection("sample-requests")}
          >
            Sample Requests
          </Button>

          <Button
            className={
              activeSection === "business-inquiries"
                ? "profile-navigation-button active"
                : "profile-navigation-button"
            }
            onClick={() =>
              setActiveSection("business-inquiries")
            }
          >
            Business Inquiries
          </Button>
        </div>

        {/* PROFILE */}

        {activeSection === "profile" && (
          <Card className="profile-card">
            <Card.Body>
              <div className="profile-section-label">
                PROFILE INFORMATION
              </div>

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

              <ProfileInfo currentUser={currentUser} />
            </Card.Body>
          </Card>
        )}

        {/* ADDRESSES */}

        {activeSection === "addresses" && <ProfileAddresses />}

        {/* ORDERS */}

        {activeSection === "orders" && <ProfileOrders />}

        {/* SAMPLE REQUESTS */}

        {activeSection === "sample-requests" && (
          <ProfileSampleRequests />
        )}

        {/* BUSINESS INQUIRIES */}

        {activeSection === "business-inquiries" && (
          <ProfileBusinessInquiries />
        )}
      </Container>
    </main>
  )
}

export default Profile