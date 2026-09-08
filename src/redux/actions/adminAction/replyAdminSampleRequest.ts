import { API_URL } from "../../../api"

export const replyAdminSampleRequest = (
  sampleRequestId: string,
  message: string,
) => {
  return async () => {
    const token = localStorage.getItem("token")

    if (!token) return

    try {
      const response = await fetch(
        `${API_URL}/admin/mail/sample-request/${sampleRequestId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message,
          }),
        },
      )

      if (!response.ok) {
        throw new Error("Unable to send sample request reply")
      }
    } catch (error) {
      console.error("Sample request reply error:", error)

      throw error
    }
  }
}
