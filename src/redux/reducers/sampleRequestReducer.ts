import type { SampleRequest } from "../../types/SampleRequest"

import {
  CREATE_SAMPLE_REQUEST,
  type CreateSampleRequestAction,
} from "../actions/sampleRequestAction/createSampleRequest"

import {
  GET_SAMPLE_REQUESTS,
  type GetSampleRequestsAction,
} from "../actions/sampleRequestAction/getSampleRequests"

import type { UnknownAction } from "redux"

interface SampleRequestState {
  sampleRequests: SampleRequest[]
}

const initialState: SampleRequestState = {
  sampleRequests: [],
}

type SampleRequestAction =
  | CreateSampleRequestAction
  | GetSampleRequestsAction

const sampleRequestReducer = (
  state = initialState,
  action: SampleRequestAction | UnknownAction,
): SampleRequestState => {
  switch (action.type) {
    case GET_SAMPLE_REQUESTS:
      return {
        ...state,
        sampleRequests: (action as GetSampleRequestsAction).payload,
      }

    case CREATE_SAMPLE_REQUEST:
      return {
        ...state,
        sampleRequests: [
          ...state.sampleRequests,
          (action as CreateSampleRequestAction).payload,
        ],
      }

    default:
      return state
  }
}

export default sampleRequestReducer