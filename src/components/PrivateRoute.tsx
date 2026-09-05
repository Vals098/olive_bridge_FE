import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"

function PrivateRoute() {
  const currentUser = useSelector(
    (state: RootState) => state.user.currentUser
  )

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default PrivateRoute