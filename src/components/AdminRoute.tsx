import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"

function AdminRoute() {
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

  if (currentUser.role !== "ADMIN") {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default AdminRoute