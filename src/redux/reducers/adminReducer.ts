import type { UnknownAction } from "redux"
import type { SampleRequest } from "../../types/SampleRequest"
import type { BusinessInquiry } from "../../types/BusinessInquiry"

import {
  GET_ADMIN_SAMPLE_REQUESTS,
  type GetAdminSampleRequestsAction,
} from "../actions/adminAction/getAdminSampleRequests"

import {
  GET_ADMIN_BUSINESS_INQUIRIES,
  type GetAdminBusinessInquiriesAction,
} from "../actions/adminAction/getAdminBusinessInquiries"

interface AdminState {
  sampleRequests: SampleRequest[]
  businessInquiries: BusinessInquiry[]
}

const initialState: AdminState = {
  sampleRequests: [],
  businessInquiries: [],
}

const adminReducer = (
  state = initialState,
  action:
    | GetAdminSampleRequestsAction
    | GetAdminBusinessInquiriesAction
    | UnknownAction,
): AdminState => {
  switch (action.type) {
    case GET_ADMIN_SAMPLE_REQUESTS:
      return {
        ...state,
        sampleRequests: (
          action as GetAdminSampleRequestsAction
        ).payload,
      }

    case GET_ADMIN_BUSINESS_INQUIRIES:
      return {
        ...state,
        businessInquiries: (
          action as GetAdminBusinessInquiriesAction
        ).payload,
      }

    default:
      return state
  }
}

export default adminReducer