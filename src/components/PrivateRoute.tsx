import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"

function PrivateRoute() {
  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser,
  )

  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (!currentUser) {
    return <p>Loading...</p>
  }

  return <Outlet />
}

export default PrivateRoute