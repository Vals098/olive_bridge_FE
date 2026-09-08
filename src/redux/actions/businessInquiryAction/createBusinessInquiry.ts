import type { AppDispatch } from "../../store"
import type {
  BusinessInquiry,
  BusinessInquiryRequest,
} from "../../../types/BusinessInquiry"
import { API_URL } from "../../../api"

export const CREATE_BUSINESS_INQUIRY = "CREATE_BUSINESS_INQUIRY"

export type CreateBusinessInquiryAction = {
  type: typeof CREATE_BUSINESS_INQUIRY
  payload: BusinessInquiry
}

export const createBusinessInquiry = (body: BusinessInquiryRequest) => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) return

    try {
      const response = await fetch(`${API_URL}/users/business-inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error("Unable to create business inquiry")
      }

      const inquiry: BusinessInquiry = await response.json()

      dispatch({
        type: CREATE_BUSINESS_INQUIRY,
        payload: inquiry,
      })
    } catch (error) {
      console.error("Create business inquiry error:", error)
    }
  }
}
