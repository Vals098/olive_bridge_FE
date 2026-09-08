import type { AppDispatch } from "../../store"
import type { BusinessInquiry } from "../../../types/BusinessInquiry"
import { API_URL } from "../../../api"

export const GET_BUSINESS_INQUIRIES = "GET_BUSINESS_INQUIRIES"

export type GetBusinessInquiriesAction = {
  type: typeof GET_BUSINESS_INQUIRIES
  payload: BusinessInquiry[]
}

export const getBusinessInquiries = () => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) return

    try {
      const response = await fetch(`${API_URL}/users/business-inquiries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Unable to retrieve business inquiries")
      }

      const inquiries: BusinessInquiry[] = await response.json()

      dispatch({
        type: GET_BUSINESS_INQUIRIES,
        payload: inquiries,
      })
    } catch (error) {
      console.error("Get business inquiries error:", error)
    }
  }
}
