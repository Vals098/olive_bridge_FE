import type { AppDispatch } from "../../store"
import type { BusinessInquiry } from "../../../types/BusinessInquiry"
import { API_URL } from "../../../api"

export const GET_ADMIN_BUSINESS_INQUIRIES = "GET_ADMIN_BUSINESS_INQUIRIES"

export type GetAdminBusinessInquiriesAction = {
  type: typeof GET_ADMIN_BUSINESS_INQUIRIES
  payload: BusinessInquiry[]
}

export const getAdminBusinessInquiries = () => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) return

    try {
      const response = await fetch(`${API_URL}/admin/business-inquiries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Unable to retrieve admin business inquiries")
      }

      const inquiries: BusinessInquiry[] = await response.json()

      dispatch({
        type: GET_ADMIN_BUSINESS_INQUIRIES,
        payload: inquiries,
      })
    } catch (error) {
      console.error("Get admin business inquiries error:", error)
    }
  }
}
