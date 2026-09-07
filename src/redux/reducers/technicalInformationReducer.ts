import type { UnknownAction } from "@reduxjs/toolkit"
import type { TechnicalInformation } from "../../types/TechnicalInformation"
import { GET_TECHNICAL_INFORMATIONS } from "../actions/technicalInformationAction/getTechnicalInformations"

interface TechnicalInformationState {
  technicalInformations: TechnicalInformation[]
}

const initialState: TechnicalInformationState = {
  technicalInformations: [],
}

const technicalInformationReducer = (
  state = initialState,
  action: UnknownAction,
): TechnicalInformationState => {
  if (action.type === GET_TECHNICAL_INFORMATIONS && "payload" in action) {
    return {
      ...state,
      technicalInformations: action.payload as TechnicalInformation[],
    }
  }

  return state
}

export default technicalInformationReducer
