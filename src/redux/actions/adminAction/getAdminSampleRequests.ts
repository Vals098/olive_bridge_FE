import type { AppDispatch } from "../../store"
import type { SampleRequest } from "../../../types/SampleRequest"

export const GET_ADMIN_SAMPLE_REQUESTS = "GET_ADMIN_SAMPLE_REQUESTS"

export type GetAdminSampleRequestsAction = {
  type: typeof GET_ADMIN_SAMPLE_REQUESTS
  payload: SampleRequest[]
}

export const getAdminSampleRequests = () => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) return

    try {
      const response = await fetch(
        "http://localhost:8080/admin/sample-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error("Unable to retrieve admin sample requests")
      }

      const sampleRequests: SampleRequest[] = await response.json()

      dispatch({
        type: GET_ADMIN_SAMPLE_REQUESTS,
        payload: sampleRequests,
      })
    } catch (error) {
      console.error("Get admin sample requests error:", error)
    }
  }
}