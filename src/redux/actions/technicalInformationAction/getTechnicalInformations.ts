import type { AppDispatch } from "../../store"
import type { TechnicalInformation } from "../../../types/TechnicalInformation"

export const GET_TECHNICAL_INFORMATIONS =
    "GET_TECHNICAL_INFORMATIONS"

export type GetTechnicalInformationsAction = {
    type: typeof GET_TECHNICAL_INFORMATIONS
    payload: TechnicalInformation[]
}

export const getTechnicalInformations = () => {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem("token")

        if (!token) return

        try {
            const response = await fetch(
                "http://localhost:8080/admin/technical-information",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )

            if (!response.ok) {
                throw new Error(
                    "Unable to retrieve technical information",
                )
            }

            const technicalInformations: TechnicalInformation[] =
                await response.json()

            dispatch({
                type: GET_TECHNICAL_INFORMATIONS,
                payload: technicalInformations,
            })
        } catch (error) {
            console.error(
                "Technical information retrieval error:",
                error,
            )
        }
    }
}