import type { AppDispatch } from "../../store"
import type { SampleRequest } from "../../../types/SampleRequest"
import type { SampleRequestRequest } from "../../../types/SampleRequestRequest"

export const CREATE_SAMPLE_REQUEST = "CREATE_SAMPLE_REQUEST"

export type CreateSampleRequestAction = {
  type: typeof CREATE_SAMPLE_REQUEST
  payload: SampleRequest
}

export const createSampleRequest = (body: SampleRequestRequest) => {
  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token")

    if (!token) return

    try {
      const response = await fetch(
        "http://localhost:8080/users/sample-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        },
      )

      if (!response.ok) {
        throw new Error("Unable to create sample request")
      }

      const sampleRequest: SampleRequest = await response.json()

      dispatch({
        type: CREATE_SAMPLE_REQUEST,
        payload: sampleRequest,
      })
    } catch (error) {
      console.error("Create sample request error:", error)
    }
  }
}
