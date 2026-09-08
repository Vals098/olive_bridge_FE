import type { AppDispatch } from "../../store"
import type { SampleRequest } from "../../../types/SampleRequest"
import { API_URL } from "../../../api"

export const UPDATE_ADMIN_SAMPLE_REQUEST_STATUS =
  "UPDATE_ADMIN_SAMPLE_REQUEST_STATUS"

export type UpdateAdminSampleRequestStatusAction = {
  type: typeof UPDATE_ADMIN_SAMPLE_REQUEST_STATUS
  payload: SampleRequest
}

export const updateAdminSampleRequestStatus = (
  sampleRequestId: string,
  status: string,
) => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) return

    try {
      const response = await fetch(
        `${API_URL}/admin/sample-requests/${sampleRequestId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        },
      )

      if (!response.ok) {
        throw new Error("Unable to update sample request status")
      }

      const updatedRequest: SampleRequest = await response.json()

      dispatch({
        type: UPDATE_ADMIN_SAMPLE_REQUEST_STATUS,
        payload: updatedRequest,
      })
    } catch (error) {
      console.error("Sample request status update error:", error)

      throw error
    }
  }
}
