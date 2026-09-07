import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"

function Profile() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser)

  if (!currentUser) {
    return (
      <Container className="py-5">
        <h1>My Profile</h1>
        <p>Please log in to view your profile.</p>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <h1>My Profile</h1>

      <p>
        <strong>Name:</strong> {currentUser.name}
      </p>

      <p>
        <strong>Surname:</strong> {currentUser.surname}
      </p>

      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>

      <p>
        <strong>Account type:</strong> {currentUser.accountType}
      </p>

      <p>
        <strong>Role:</strong> {currentUser.role}
      </p>

      <p>
        <strong>Status:</strong> {currentUser.status}
      </p>
    </Container>
  )
}

export default Profile
