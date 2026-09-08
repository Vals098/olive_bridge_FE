import type { AppDispatch } from "../../store"
import type { SampleRequest } from "../../../types/SampleRequest"
import { API_URL } from "../../../api"

export const GET_SAMPLE_REQUESTS = "GET_SAMPLE_REQUESTS"

export type GetSampleRequestsAction = {
  type: typeof GET_SAMPLE_REQUESTS
  payload: SampleRequest[]
}

export const getSampleRequests = () => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) return

    try {
      const response = await fetch(`${API_URL}/users/sample-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Unable to retrieve sample requests")
      }

      const sampleRequests: SampleRequest[] = await response.json()

      dispatch({
        type: GET_SAMPLE_REQUESTS,
        payload: sampleRequests,
      })
    } catch (error) {
      console.error("Get sample requests error:", error)
    }
  }
}
