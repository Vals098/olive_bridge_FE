import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/store"
import { logoutAction } from "../redux/actions/userAction/logout"

function Navbar() {
  const dispatch = useDispatch<AppDispatch>()

  const currentUser = useSelector((state: RootState) => state.user.currentUser)

  const handleLogout = () => {
    dispatch(logoutAction())
  }

  return (
    <nav>
      <p>OliveBridge</p>

      {currentUser ? (
        <div>
          <span>Welcome, {currentUser.name}!</span>

          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
