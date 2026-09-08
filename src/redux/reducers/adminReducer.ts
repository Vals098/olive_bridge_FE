import type { UnknownAction } from "redux"
import type { SampleRequest } from "../../types/SampleRequest"
import type { BusinessInquiry } from "../../types/BusinessInquiry"
import type { Order } from "../../types/Order"

import {
  GET_ADMIN_SAMPLE_REQUESTS,
  type GetAdminSampleRequestsAction,
} from "../actions/adminAction/getAdminSampleRequests"

import {
  GET_ADMIN_BUSINESS_INQUIRIES,
  type GetAdminBusinessInquiriesAction,
} from "../actions/adminAction/getAdminBusinessInquiries"

import {
  GET_ADMIN_ORDERS,
  type GetAdminOrdersAction,
} from "../actions/adminAction/getAdminOrders"

import {
  UPDATE_ADMIN_SAMPLE_REQUEST_STATUS,
  type UpdateAdminSampleRequestStatusAction,
} from "../actions/adminAction/updateAdminSampleRequestStatus"

interface AdminState {
  sampleRequests: SampleRequest[]
  businessInquiries: BusinessInquiry[]
  orders: Order[]
}

const initialState: AdminState = {
  sampleRequests: [],
  businessInquiries: [],
  orders: [],
}

const adminReducer = (
  state = initialState,
  action:
    | GetAdminSampleRequestsAction
    | GetAdminBusinessInquiriesAction
    | GetAdminOrdersAction
    | UpdateAdminSampleRequestStatusAction
    | UnknownAction,
): AdminState => {
  switch (action.type) {
    case GET_ADMIN_SAMPLE_REQUESTS:
      return {
        ...state,
        sampleRequests: (action as GetAdminSampleRequestsAction).payload,
      }

    case UPDATE_ADMIN_SAMPLE_REQUEST_STATUS:
      return {
        ...state,
        sampleRequests: state.sampleRequests.map((request) =>
          request.sampleRequestId ===
          (action as UpdateAdminSampleRequestStatusAction).payload
            .sampleRequestId
            ? (action as UpdateAdminSampleRequestStatusAction).payload
            : request,
        ),
      }

    case GET_ADMIN_BUSINESS_INQUIRIES:
      return {
        ...state,
        businessInquiries: (action as GetAdminBusinessInquiriesAction).payload,
      }

    case GET_ADMIN_ORDERS:
      return {
        ...state,
        orders: (action as GetAdminOrdersAction).payload,
      }

    default:
      return state
  }
}

export default adminReducer
